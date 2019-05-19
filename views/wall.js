var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var TITLE = 'Meow'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  state.reloadWall = () => {
    let interval = setInterval(() => {
        if (state.ids.length && state.myKitties.length) {
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
                    console.log(document.getElementsByTagName('body'))
                    // document.getElementsByTagName('body')[0].style.cursor = 'crosshair'
                };
            }
            clearInterval(interval)
        }
    })
  }

  state.reloadWall()


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
        const els = document.getElementsByClassName('catOption')
        for (let el of els) {
            emit('rotate', slider.value)
            el.style.transform = `rotateZ(${slider.value}deg)`
        }
    }

    const updateScaleValue = () => {
        var slider = document.getElementById("scale");
        var output = document.getElementById("scaleText");
        output.innerHTML = `${slider.value}x Sticker Size`
        emit('scale', slider.value)
    }
        const withdrawMoney = () => {
            emit('withdrawCream')
        }


    setInterval(() => document.getElementById('balance').innerText = `ETH Locked: ${state.supplyBalance || '0.00'}⧫ `)

    const wallStyles = css`

    canvas {
        margin: 0;
        padding: 0;
        box-shadow: .2rem .2rem .2rem #00000010;
        border: 2px dashed black;
        border-bottom: none;
        box-sizing: border-box;
    }

    :host {
        background: url('../assets/graph.png'), #f8f94c;
        background-blend-mode: multiply;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        height: 100vh;
    }

    :host h1 {

    }

    :host section {
        min-width: 640px;
        background: whitesmoke;
        box-shadow: .2rem .5rem .5rem #00000020;
        border: 2px dashed black;
        border-top: none;
        border-bottom: none;
        z-index: 1;
    }

    #container {
        margin-top: -2px;
        height: 10rem;
        background: url('../assets/moneypattern.png'), lightgreen;
        background-blend-mode: soft-light;
        width: 100%;
        content: '';
        z-index: 0;
        border-top: 2px dashed black;
    }

    #container::after {
        position: fixed;
        content: '<------------ Your Kitties ------------>';
        font-size: 1rem;
        color: #000000;
        bottom: 8rem;
        z-index: 3;
        text-align: center;
        width: 100%;
    }

    .ui p {
        margin: 5px;
    }

    .ui {
        padding: 5px;
    }

    #myCatsList {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .catOption {
        width: 140px;
    }

    #canvasBackground {
        background: whitesmoke;
    }

    #textArea {
        max-width: 640px;

    }

    .slider {
        width: 25%;
    }

    #withdraw {
        outline: none;
        width: 80%;
        padding: 8px;
        border: 1px solid #00000010;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        transition: .1s all ease-in-out;
      }

      #withdraw:hover {
        padding: 8px;
        padding-left: 7px;
        padding-top: 5px;
        border: 1px solid #00000030;
        border-right: 2px solid black;
        border-bottom: 4px solid black;
      }

      #withdraw:active {
        padding: 8px;
        padding-left: 7px;
        padding-bottom: 5px;
        outline: none;
        border: 1px solid black;
        border-left: 2px solid black;
        border-top: 4px solid black;
        box-shadow: 1px 1px 3px #00000040;
      }

    `

    return html`
    <body class='${wallStyles + ' flex flex-column items-center justify-end'}'>
        <div id='textArea'>
            <h1>Earn 12% with a Feline Term Deposit</h1>
            <p>Select a Cryptokitty, choose it's rotation and scale, then place it into the Regulatory Sandbox® to start earning interest and growing your wealth. It's time to have the life you've always dreamed of.</p>
        </div>
        <div id='canvasBackground'>
            <div id='canvas'></div>
        </div>
        <section class='flex justify-around'>
            <div class='ui flex flex-column items-center justify-between'>
                <p id='rotationText'>0° Degrees</p>
                <input oninput=${() => updateRotationValue()} type="range" min="0" max="360" value="0" class="slider" id="rotation">
            </div>
            <div class='ui flex flex-column items-center justify-between'>
                <p id='scaleText'>1x Sticker Size</p>
                <input oninput=${() => updateScaleValue()} type="range" min="1" max="5.00" value="1" class="slider" id="scale">
            </div>
            <div class='ui flex flex-column items-center justify-around'>
                <p id='balance'>Balance</p>
                <button id='withdraw' onclick=${() => withdrawMoney()}>Withdraw 💵</button>
            </div>
        </section>
        <div id='container'>
            <div id='myCatsList'></div>
        </div>
    </body>
    `
}

{/* <div id='cream'>
<div class='balance'>My Cream: <span </span>💦</div>
<button class='withdraw flex items-center justify-center'>Lick 👅</button>
</div> */}

// var slider = document.getElementById("scale");
// var output = document.getElementById("scaleText");
// output.innerHTML = `${slider.value}x Scale`
// const els = document.getElementsByClassName('catOption')
// for (let el of els) {

//     el.style.transform = `scale(${slider.value})`
// }

// }