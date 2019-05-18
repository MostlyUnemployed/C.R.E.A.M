require('babel-polyfill')
var css = require('sheetify')
var choo = require('choo')

css('tachyons')
css('./assets/globalStyles.css')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/app'))

app.route('/', require('./views/main'))
app.route('/wall', require('./views/wall'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
