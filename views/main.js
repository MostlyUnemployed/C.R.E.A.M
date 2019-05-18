var html = require('choo/html')
var css = require('sheetify')
var Menu = require('../components/menu')
var menu = new Menu()

var TITLE = 'sticker-interest - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const mainStyles = css`
  :host {
    background: #f8f94c;
  }
  `

  if (state.wallet) setTimeout(() => emit('pushState', '/wall'), 1000)

  return html`
    <body>
      <button onclick='${() => {
        emit('createWallet')
      }}'>CREATE A WALLET</button>
    </body>
  `
}
