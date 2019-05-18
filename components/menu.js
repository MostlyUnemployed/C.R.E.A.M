var html = require('choo/html')
var css = require('sheetify')

const menuStyles = css`
    :host {
        position: fixed;
        left: 1rem;
        top: 1rem;
        width: 10rem;
        height: 10rem;
        background: white;
    }
`

const menu = () => {
    return html`
    <section class='${menuStyles} flex-column justify-center items-center'>
    <h1>C.R.E.A.M</h1>
    </section
    ` 
}

module.exports = menu