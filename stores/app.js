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
  const loader = PIXI.Loader.shared
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

  // app.renderer.resize(window.innerWidth, window.innerHeight);
  app.renderer.backgroundColor = 0xffffff00;
  app.renderer.plugins.interaction.on('pointerup', onClick)

  function onClick (event) {
    const coords = { x: event.data.global.x, y: event.data.global.y }
    emitter.emit('canvasClick', coords)
  }

  emitter.on('canvasClick', async (coords) => {
    if (state.activeKitty) {
      console.log('YEAH WE HAVE A CAT')
      console.log(state.activeKitty)
      const n = (state.activeKitty.lastIndexOf('/'))
      const kittyId = state.activeKitty.substring(n + 1, state.activeKitty.length - 4)
      emitter.emit('deposit', kittyId, Math.floor(coords.x), Math.floor(coords.y), Math.floor((Math.random() * 360)), '0.01')
    }
  })

  //FILTERS

  emitter.on('KittiesLoaded', function () {
    // app.stage.removeChildren()
    console.log('SHOULD HAVE REMOVED ALL CHILDREN')
    let userAddresses = Object.keys(state.kittyData)
    let kitties = []
    userAddresses.map(function(key) {
      state.kittyData[key].length > 0 && state.kittyData[key].map((kitty) => {
        kitties.push(kitty)
        state.ids.push(kitty.id)
      })
      state.kitties = kitties
    });


    // maps loaded kitties and adds them to Pixi Loader
    state.kitties.map((cat, i) => {
      loader.add(`cat${i}`, cat.img)
      if (!resources['backgroundImage']) {
         loader.add('backgroundImage',  '../assets/space.gif')
      }
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
      console.log(state.kitties)

      state.kitties.map((cat, i) => {
        console.log({cat})
        let catSprite = new Sprite(resources['cat' + i].texture);
        catSprite.x = Math.abs(cat.x)
        catSprite.y = Math.abs(cat.y)
        catSprite.width = 40
        catSprite.height = 40
        catSprite.angle = cat.rot
        //Add the catSprite to the stage (canvas)
        app.stage.addChild(catSprite);

        // catSprite.filters = [kittyStroke, kittyShadow]
      })
    }
    //This `setup` function will run when the image has loaded
    loader.load(setup);
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

  // GET CREAM ADDRESS
  emitter.on('deposit', async function (kittyId, x, y, rot, eth) {
    console.log({ kittyId, x, y, rot, eth })
    const tx = await wallet.deposit(kittyId, x, y, rot, eth)
    emitter.emit('getAllKitties')
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
    console.log(myKitties)
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
        document.getElementById('canvas').replaceWith(app.view);
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