var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var TITLE = 'sticker-interest - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const sidebarStyles = css`
    :host {
        width: 20rem;
        height: 100vh;
        max-height: 800px;
        position: fixed;
        right: 0;
        background: whitesmoke;
        transition: right 1s ease-in-out
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
    }

    #catOption {
        position: relative;
        z-index: 1;
        box-sizing: border-box;
    }

    #catOption::selection {
        Border: 1px solid red;
    }

    #catOption:hover {
        z-index: 2;
        border: 3px dashed black;
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
  `


    let interval = setInterval(() => {
        if (state.myKitties) {
            const elems = state.myKitties.map((cat) => {
                return `<img id='catOption' src='${cat.image_url}'></img>`
            })
            let elemString = ''
            for (let elem of elems) elemString += elem
            console.log(elemString)
            console.log(raw(elemString))
            document.getElementById('myCatsList').innerHTML = elemString
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
