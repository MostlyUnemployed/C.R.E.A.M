var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var TITLE = 'sticker-interest - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const sidebarStyles = css`
    :host {
        width: 12rem;
        height: 60vh;
        max-height: 800px;
        position: fixed;
        top: 20vh;
        right: 0;
        background: whitesmoke;
        transition: right 1s ease-in-out;
        overflow: scroll;
        border: 3px dashed black;
        border-right: none;
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

    return html`
    <body>
    <div class='balance'>My Cream: <span id='balance'></span>💦</div>
    <button class='withdraw flex items-center justify-center'>Lick 👅</button>
    <section id='sidebar' class='${sidebarStyles}'>
        <button onclick='${() => toggleSideBar()}'>${'>>'}</button>
        <div id='container'>
            <div id='myCatsList'>
            
            </div>
        </div>
    
    </section>
    <div id='canvas'></div>
    </body>
    `

}
