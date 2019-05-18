var html = require('choo/html')
var css = require('sheetify')
var Menu = require('../components/menu')

var TITLE = 'sticker-interest - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const mainStyles = css`

  @import url('https://fonts.googleapis.com/css?family=Baloo');
  
  h1, h2, h3, h4 {
    font-family: 'Baloo';
    color: #343f47;
  }

  :host {
    background: #f8f94c;
  }
  `

  return html`
  <body>
  <link href="https://fonts.googleapis.com/css?family=Baloo&display=swap" rel="stylesheet">
  ${Menu()}
  <div id='canvas'></div>

  </body>

  `

}
