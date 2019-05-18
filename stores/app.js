import * as PIXI from 'pixi.js'
import wallet from '../utils/wallet'

module.exports = store

function store (state, emitter) {
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


  state = {
    wallet: false
  }

  emitter.on('DOMContentLoaded', function () {
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.getElementById('canvas').appendChild(app.view);
  })


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

  loadMyKitties()

  // CONNECT WALLET
  emitter.on('connectWallet', async function () {
    await wallet.connect()
    emitter.emit('getWallet')
  })

  // CREATE WALLETS
  emitter.on('createWallet', async function () {
    const isDeployed = await wallet.isDeployed()
    state.isDeployed = isDeployed
    if (isDeployed) {
      console.error('Wallet already deployed')
      return
    }
    state.wallet = true
    emitter.emit('render')
    const address = await wallet.deploy()
    state.creamAddress = address
  })

  // GET CREAM ADDRESS
  emitter.on('getWallet', async function () {
    const creamWallet = await wallet.getWallet()
    state.creamAddress = creamWallet
    console.log(state)
  })

  emitter.on('deposit', async function (kittyId, wei) {
    const tx = await wallet.deposit(kittyId, wei)
    console.log({ tx })
  })

  emitter.emit('connectWallet')


}

//  LOADER SYNTAX FOR WHEN SHIT GETS REAL
// .add({
//   url: 'https://...',
//   onComplete: function () {},
//   crossOrigin: true
// })