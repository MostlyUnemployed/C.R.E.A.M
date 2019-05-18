import * as PIXI from 'pixi.js'
import wallet from '../utils/wallet'

module.exports = store

function store (state, emitter) {

  state.wallet = false

  // Get crypto kitties utilities
  const ckUtils = require('../utils/kittys')
  //Defining Pixi Aliases
  const Application = PIXI.Application
  const loader = PIXI.Loader.shared
  const resources = PIXI.Loader.shared.resources
  const Sprite = PIXI.Sprite
  //Create a Pixi Application
  let app = new Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
  });

  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.renderer.backgroundColor = 0xf8f94c;

  emitter.on('KittiesLoaded', function () {
    let catStickers = []
    //maps loaded kitties and adds them to Pixi Loader
    state.cats.map((cat, i) => {
      loader.add(`cat${i}`, cat.image_url)
    })

    function setup() {
      //Create the cat sprite
      state.cats.map((cat, i) => {
        let catSprite = new Sprite(resources['cat' + i].texture);
        catSprite.x = Math.random() * 100
        catSprite.y = Math.random() * 100
        //Add the catSprite to the stage (canvas)
        app.stage.addChild(catSprite);
      })
    }
    //This `setup` function will run when the image has loaded
    loader.load(setup);
  })
  //loads ya cats
  const loadMyKitties = async () => {
    state.cats = await ckUtils.getKitties()
    emitter.emit('KittiesLoaded')
  }

  // CONNECT METAMASK AND CHECK FOR CREAM WALLET
  emitter.on('connectWallet', async function () {
    await wallet.connect()
    const isDeployed = await wallet.isDeployed()
    state.isDeployed = isDeployed
    if (state.isDeployed) {
      emitter.emit('getWallet')
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
    emitter.emit('render')
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
  emitter.on('deposit', async function (kittyId, wei) {
    console.log(kittyId)
    console.log(wei)
    const tx = await wallet.deposit(kittyId, wei)
    console.log({ tx })
  })

  emitter.on('getAllKitties', async function () {
    const kitties = await wallet.getAllKitties()
    state.kitties = kitties
  })

  emitter.emit('connectWallet')


  emitter.on('navigate', () => {
    console.log(state.route)
    setTimeout(function(){
      if (state.route === 'wall'){
        document.getElementById('canvas').appendChild(app.view);
      }
     }, 1000);
  })

  emitter.on('DOMContentLoaded', () => {
    setTimeout(function(){
      if (state.route === 'wall'){
        document.getElementById('canvas').appendChild(app.view);
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