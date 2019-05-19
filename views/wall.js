var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var TITLE = 'sticker-interest - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

 
    let interval = setInterval(() => {
        console.log('trying')
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
    output.innerHTML = `${slider.value}x Sticker Size`

}
        const withdrawMoney = () => {
            emit('withdrawCream')
        }
        

    setInterval(() => document.getElementById('balance').innerText = `Interest Earned: ${state.supplyBalance || '0.00'}%`)

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
            <div class='ui flex-column align-start justify-between'>
                <p id='rotationText'>0° Degrees</p>
                <input oninput=${() => updateRotationValue()} type="range" min="0" max="360" value="0" class="slider" id="rotation">
            </div>
            <div class='ui flex-column align-start justify-between'>
                <p id='scaleText'>1x Sticker Size</p>
                <input oninput=${() => updateScaleValue()} type="range" min="0" max="5.00" value="0" class="slider" id="scale">
            </div>
            <div class='ui flex-column align-start justify-between'>
                <p id='balance'>Balance</p>
                <button onclick=${() => withdrawMoney()}>Close FTD</button>
            </div>
        </section>
        <div id='container'>
            <h3>Choose a CryptoKitty</h3>
            <div id='myCatsList'></div>
        </div>
    </body>
    `
}

{/* <div id='cream'>
<div class='balance'>My Cream: <span </span>💦</div>
<button class='withdraw flex items-center justify-center'>Lick 👅</button>
</div> */}