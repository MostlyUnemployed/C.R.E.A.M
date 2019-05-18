var html = require('choo/html')
var css = require('sheetify')

var TITLE = 'sticker-interest - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)



    return html`
    <body>
    <div id='canvas'></div>
    </body>
    `

}
