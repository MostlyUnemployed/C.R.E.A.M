var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var TITLE = 'sticker-interest - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const sidebarStyles = css`
    :host {
        width: 18rem;
        height: 100vh;
        max-height: 800px;
        position: fixed;
        right: 0;
        background: whitesmoke;
        transition: right 1s ease-in-out;
        overflow: hidden;
        border-left: 3px dashed black;
    }

    :host button {
        position: relative;
        top: 0;
        left: -2rem;
        background: none;
        border: none;
        font-size: 2rem;
        font-weight: bold;
    }

    :host #container {
        width: 100%;
        max-height: 100vh;
        overflow: scroll;
        direction: rtl;
    }

    .catOption {
        position: relative;
        z-index: 1;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .catOption:hover img {
        transform: scale(1.4);
    }

    .catOption img {
        width: 80%;
        transform: scale(1);
        transition: transform .5s ease-in-out ;
    }

    #myCatsList {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: auto;
    }

    .rolledOut {
        right: -20rem;
    }

    .rolledIn {
        right: 0;
    }

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


    let interval = setInterval(() => {
        if (state.myKitties) {
            const elems = state.myKitties.map((cat) => {
                if (state.ids.indexOf(cat.id) !== -1) return ``
                return `<div class='catOption'><img src=${cat.image_url} /></div>`
            })
            let elemString = ''
            for (let elem of elems) elemString += elem
            document.getElementById('myCatsList').innerHTML = elemString
            let catElems = document.getElementsByClassName('catOption')
            for (let catElem of catElems) {
                catElem.onclick = function() {
                    state.activeKitty = (catElem.children[0].getAttribute('src'))
                };
            }
            clearInterval(interval)
        }


    }, 2000)


    const toggleSideBar = ()  => {
    let sidebar = document.getElementById('sidebar')
    if (sidebar.classList.contains("rolledOut")) {
        sidebar.classList.remove("rolledOut");
        sidebar.classList.add("class", "rolledIn");
    } else {
        sidebar.classList.remove("rolledIn");
        sidebar.classList.add("class", "rolledOut");
    }
    sidebar.classList.remove("rolledIn");
  }

  const updateRotationValue = () => {
    var slider = document.getElementById("rotation");
    var output = document.getElementById("rotationText");
        output.innerHTML = `${slider.value}° Degrees`
    }

    const updateScaleValue = () => {
    var slider = document.getElementById("scale");
    var output = document.getElementById("scaleText");
    output.innerHTML = `${slider.value}x Scale`

}

    setInterval(() => document.getElementById('balance').innerText = state.supplyBalance || '0.00', 500)

    return html`
    <body>
    <div id='cream'>
        <div class='balance'>My Cream: <span id='balance'></span>💦</div>
        <button class='withdraw flex items-center justify-center' onclick=${() => emit('withdrawCream')}>Lick 👅</button>
    </div>

    <section id='sidebar' class='${sidebarStyles}'>
        <button onclick='${() => toggleSideBar()}'>${'>>'}</button>
        <div class='pa1'>
            <h1>Choose a kitty to MILK</h1>
            <p>Rotate, Scale & Stick your little Milk Machine</p>
            <div class="slidecontainer flex-column items-center">
                <p id='rotationText'>0° Degrees</p>
                <input oninput=${() => updateRotationValue()} type="range" min="0" max="360" value="0" class="slider" id="rotation">
                <a>Rotate your kitty however you like!</a>
                <p id='scaleText'>1x Scale</p>
                <input oninput=${() => updateScaleValue()} type="range" min="0" max="5.00" value="0" class="slider" id="scale">
                <a>The larger you scale your kitty, the more it costs</a>
            </div>
        </div>
        <div id='container'>
            <div id='myCatsList'>

            </div>
        </div>
    </section>

    <div id='canvas'></div>
    </body>
    `
}
