var html = require('choo/html')
var css = require('sheetify')
var Menu = require('../components/menu')
var menu = new Menu()

var TITLE = 'sticker-interest - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const mainStyles = css`
  .bg {
    background: #FDFF9C;
  }
  .bigtext {
    font-size: 14rem;
    font-family: 'Baloo';
    background: -webkit-linear-gradient(0deg, #FF00A8, #00E0FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 10;
  }
  .cta {
    font-size: 3rem;
    background: #F08CA5;
    border-radius: 50px;
    font-family: 'Baloo';
    border: none;
    box-shadow: 0px 12px 0px #F08CA5BB;
    cursor: pointer;
    z-index: 999;
  }
  .cta:hover {
  }
  .cta:focus {
    outline: none;
  }
  .cta:active {
    outline: none;
    box-shadow: 0px 1px 2px #000000AA;
    margin-top: 12px;
  }
  .kit {
    position: fixed;
  }
  .k1 {
    right: -868px;
    top: -856px;
    transform: rotateZ(241deg) scale(0.4);
  }
  .k2 {
    top: -801px;
    left: -842px;
    transform: rotateZ(103deg) scale(0.5);
  }
  .k3 {
    bottom: -559px;
    left: -200px;
  }
  .k4 {
    bottom: -570px;
    right: -375px;
    transform: rotateZ(-12deg) scale(0.9);
  }
  .k5 {
    bottom: 20px;
    right: -92px;
    transform: scale(0.5);
    z-index: 5;
  }
  `

  if (state.wallet) setTimeout(() => emit('pushState', '/wall'), 1000)

  return html`
    <body class='bg w-100 h-100'>
      <div class='bg w-100 h-100 flex flex-column justify-center items-center'>
        <div class='bigtext tc f1'>C.R.E.A.M.</div>
        <button class='tc cta f2 pa5 pt3 pb3' onclick='${() => {
          emit('createWallet')
        }}'>I am over 18</button>
      </div>
      </body>
      `
}

      // <img class='kit k1' src='https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1054559.png' />
      // <img class='kit k2' src='https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/420.png' />
      // <img class='kit k3' src='https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/221.png' />
      // <img class='kit k4' src='https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/556220.png' />
      // <img class='kit k5' src='https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/729953.png' />