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
        this.localstate = null
        this.render = this.render.bind(this)
    }

    createElement (state, emit) {
<<<<<<< HEAD
        this.localstate = state.wallet
        console.log(this.localstate)

        state.updateMenu = this.updateMenuFromState

        if (!this.localstate.wallet) {
=======
        if (this.onboarding) {
>>>>>>> 912b2c302e312f9406eda1737cc367832beaeaf3
            return html`
            <section class='${menuStyles} flex-column justify-center items-center'>
                <h1>C.R.E.A.M</h1>
                <p>Welcome to the app, I don't think you have a wallet</p>
                <button onclick='${() => {
                    emit('createWallet'),
                    this.render()
                }}'>Create Wallet</button>
            </section
            `
        } 
        if (this.localstate.wallet === 'LOADING') {
            return html`
            <section class='${menuStyles} flex-column justify-center items-center'>
            <p>We loading fam</p>
                <button>Milk your cats</button>
            </section
            `
        }

        if (this.localstate.wallet) {
            return html`
            <section class='${menuStyles} flex-column justify-center items-center'>
                <h1>C.R.E.A.M</h1>
<<<<<<< HEAD
                <p>Okay so you've got a wallet</p>
                <button>Milk your cats</button>
=======
                <button onclick='${() => {
                    // need to choose a kitty and a price here and then...
                    // emit('deposit', kittyId, priceInWei)
                }}'>BILBO BAGGINS</button>
>>>>>>> 912b2c302e312f9406eda1737cc367832beaeaf3
            </section
            `
        }
    }

    // Implement conditional rendering
  update () {
    // this.localstate != state.onboarding
    true
  }
}


module.exports = Menu