var Nanocomponent = require('nanocomponent')
var html = require('nanohtml')
var css = require('sheetify')

const menuStyles = css`
    :host {
        position: fixed;
        left: 1rem;
        top: 1rem;
        width: 20rem;
        height: 20rem;
        max-width: 25vw;
        max-height: 25vh;
        background: white;
        box-shadow: 3px 3px 3px #00000020;
    }

    :host::before {
        position: relative;
        top: 100%;
        left: 100%;
        transform: rotateZ(45deg);
        content: '<';
        font-size: 2rem;
        display: inherit;
        width: 2rem;
        height: 2rem;
    }
`


class Menu extends Nanocomponent {

    constructor () {
        super()
        this.state = null
    }

    createElement (state, emit) {
        if (this.onboarding) {
            return html`
            <section class='${menuStyles} flex-column justify-center items-center'>
                <h1>C.R.E.A.M</h1>
                <button onclick='${() => {
                    emit('createWallet'),
                    this.render()
                    console.log(this.state)
                    console.log(state.onboarding)
                }}'>Create Wallet</button>
            </section
            `
        } else {
            return html`
            <section class='${menuStyles} flex-column justify-center items-center'>
                <h1>C.R.E.A.M</h1>
                <button onclick='${() => {
                    // need to choose a kitty and a price here and then...
                    // emit('deposit', kittyId, priceInWei)
                }}'>BILBO BAGGINS</button>
            </section
            `
        }
    }

    // Implement conditional rendering
  update () {
    // this.state != state.onboarding
    true
  }

//   setOnboarding (onboarding) {
    //   this.render(onboarding)
//   }

}


module.exports = Menu