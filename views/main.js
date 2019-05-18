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

  const updateFunc = () => {
    menu.render()
  }

  return html`
  <body>
    ${menu.render()}
    <div id='canvas'></div>
  </body>

  `

}
