var html = require('choo/html')
var css = require('sheetify')

var TITLE = 'sticker-interest - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

    const css = css`
      .balance {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 4rem;
        font-family: 'Baloo';
        background: -webkit-linear-gradient(0deg, #FF00A8, #00E0FF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                      supported by Chrome and Opera */
      }
      .withdraw {
        position: absolute;
        top: 100px;
        left: 10px;
        font-size: 2rem;
        font-family: 'Baloo';
        background: #F08CA5;
        border-radius: 50px;
        border: none;
        cursor: pointer;
        padding: 15px 20px;
      }
      .withdraw:active,
      .withdraw:focus {
        outline: none;
      }
    `

    setInterval(() => {
      document.getElementById('balance').innerText = state.supplyBalance || '0.00'
    }, 500)

    return html`
      <body>
        <div class='balance'>My Cream: <span id='balance'></span>💦</div>
        <button class='withdraw flex items-center justify-center' onclick=${() => emit('withdrawCream')}>Lick 👅</button>
        <div id='canvas'></div>
      </body>
    `

}
