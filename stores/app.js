import * as PIXI from 'pixi.js'
import wallet from '../utils/wallet'
import { OutlineFilter, DropShadowFilter } from 'pixi-filters';


module.exports = store

function store (state, emitter) {

  state.wallet = false
  state.ids = []

  // Get crypto kitties utilities
  const ckUtils = require('../utils/kittys')
  //Defining Pixi Aliases
  const Application = PIXI.Application
  let loader = PIXI.Loader.shared
  const resources = PIXI.Loader.shared.resources
  const Sprite = PIXI.Sprite
  //Create a Pixi Application
  let app = new Application({
    width: 640,
    height: 360,
    antialias: true,
    transparent: true,
    resolution: 1
  });

  app.stage.interactive = true;
  app.stage.hitArea = new PIXI.Rectangle(0, 0, 2000, 2000);
  app.stage.defaultCursor = "url(/assets/cursor.png) 32 32, auto;";
  app.stage.cursor = "url(/assets/cursor.png) 32 32, auto;";


  // CURSOR
















  app.renderer.plugins.interaction.on('pointerup', onClick)

  function onClick (event) {
    const coords = { x: event.data.global.x, y: event.data.global.y }
    emitter.emit('canvasClick', coords)
  }


  emitter.on('canvasClick', async (coords) => {
    let kittyId = getNextKitty()
    if (state.activeKitty) {
      const n = (state.activeKitty.lastIndexOf('/'))
      let kittyId = state.activeKitty.substring(n + 1, state.activeKitty.length - 4)
    }
    if (kittyId === -1) return
    const eth = state.scale ? (0.01 * Math.pow(10, state.scale - 1)) : 0.01
    console.log({eth})
    emitter.emit('deposit', kittyId, Math.floor(coords.x), Math.floor(coords.y), state.rotated, eth.toString())
    state.activeKitty = null
  })

  function getNextKitty() {
    const kittiesCanStick = removeAlreadyStuck(state.myKitties)
    if (kittiesCanStick[0]) return kittiesCanStick[0].id
    return -1
  }

  function removeAlreadyStuck(kitties) {
    const safe = kitties.filter((k) => {
      return state.ids.indexOf(k.id) === -1
    })
    return safe
  }



  //FILTERS

  emitter.on('KittiesLoaded', function () {
    app.stage.removeChildren()

    let userAddresses = Object.keys(state.kittyData)
    let kitties = []
    state.ids = []
    userAddresses.map(function(key) {
      state.kittyData[key].length > 0 && state.kittyData[key].map((kitty) => {
        kitties.push(kitty)
        state.ids.push(kitty.id)
      })
      state.kitties = kitties
    });

    state.nextKitty = getNextKitty()

    // maps loaded kitties and adds them to Pixi Loader
    // loader.reset()
    // loader = PIXI.Loader.shared
    state.kitties.map((cat) => {
      if (resources[`cat${cat.id}`]) return
      loader.add(`cat${cat.id}`, cat.img)
    })

    function setup() {
      // const kittyStroke = new OutlineFilter(5, 0xFFFFF0)
      // const kittyShadow = new DropShadowFilter({
      //   distance: 0.1,
      //   color: 0x000000,
      //   alpha: 0.1,
      //   blur: 1
      // })
      //Create the cat sprite
      state.kitties.map((cat, i) => {
        let catSprite = new Sprite(resources[`cat${cat.id}`].texture);
        let sizeMultiplier = (cat.value / 0.01).toString().length
        catSprite.width = sizeMultiplier * 75
        catSprite.height = sizeMultiplier * 75
        catSprite.x = Math.abs(cat.x)
        catSprite.y = Math.abs(cat.y)
        catSprite.angle = cat.rot
        //Add the catSprite to the stage (canvas)
        app.stage.addChild(catSprite);

        // catSprite.filters = [kittyStroke, kittyShadow]
      })
    }
    //This `setup` function will run when the image has loaded
    loader.load(setup);
    state.reloadWall()
  })

  // CONNECT METAMASK AND CHECK FOR CREAM WALLET
  emitter.on('connectWallet', async function () {
    await wallet.connect()
    const isDeployed = await wallet.isDeployed()
    state.isDeployed = isDeployed
    if (state.isDeployed) {
      emitter.emit('getWallet')
      emitter.emit('getMyKitties')
      emitter.emit('getAllKitties')
      return
    }
    state.wallet = false
  })

// GET YOUR WALLET IF YOU HAVE ONE
  emitter.on('getWallet', async function () {
    state.wallet = 'LOADING'
    state.creamAddress = await wallet.getWallet()
    state.wallet = true
    emitter.emit('getCompoundBalance')
    emitter.emit('render')
  })

  emitter.on('getCompoundBalance', async () => {
    state.supplyBalance = Number((await wallet.getCompoundBalance())).toFixed(2)
  })


  // CREATE ONE IF YOU DONT
  emitter.on('createWallet', async function () {
    const isDeployed = await wallet.isDeployed()
    if (isDeployed) {
      console.error('Wallet already deployed')
      emitter.emit('getWallet')
      return
    }
    const address = await wallet.deploy()
    state.creamAddress = address
    state.wallet = true
    emitter.emit('getWallet')
  })

  emitter.on('rotate', async (degrees) => {
    state.rotated = degrees
  })

  emitter.on('scale', async (factor) => {
    state.scale = factor
  })

  // GET CREAM ADDRESS
  emitter.on('deposit', async function (kittyId, x, y, rot, eth) {
    console.log({ kittyId, x, y, rot, eth })
    const tx = await wallet.deposit(kittyId, x, y, rot, eth)
    emitter.emit('getAllKitties')
    emitter.emit('getCompoundBalance')
    console.log({ tx })
  })

  emitter.on('withdrawCream', async function () {
    const tx = await wallet.withdrawAll()
    console.log({ tx })
    emitter.emit('getCompoundBalance')
    emitter.emit('getAllKitties')
  })

  emitter.on('getMyKitties', async function () {
    let myWallet = await wallet.getMyAddress()
    let myKitties = await ckUtils.getKitties(myWallet)
    state.myKitties = myKitties
    state.myWallet = myWallet
  })

  emitter.on('getAllKitties', async function () {
    const kitties = await wallet.getAllKitties()
    state.kittyData = kitties
    emitter.emit('KittiesLoaded')
  })

  emitter.emit('connectWallet')


  emitter.on('navigate', () => {
    console.log(state.route)
    setTimeout(function(){
      if (state.route === 'wall'){
        document.getElementById('canvas').replaceWith(app.view);
      }
     }, 1000);
  })

  emitter.on('DOMContentLoaded', () => {


    setTimeout(function(){
      if (state.route === 'wall'){
        const canvasContainer = document.getElementById('canvas')
        canvasContainer.replaceWith(app.view)
        const canvas = document.getElementsByTagName('canvas')[0]
        // canvas.style.removeProperty('cursor')
        canvasContainer.style.setProperty('cursor', 'url(/assets/cursor.png) 32 32, auto;')
        // console.log(canvasContainer.style.getProperty('cursor'))
        // console.log(canvasContainer)
        // console.log(canvasContainer.style)
        // console.log("style removed")
      }
     }, 1000);
  })

    //Add the canvas that Pixi automatically created for you to the HTML documens
}

//  LOADER SYNTAX FOR WHEN SHIT GETS REAL
// .add({
//   url: 'https://...',
//   onComplete: function () {},
//   crossOrigin: true
// })