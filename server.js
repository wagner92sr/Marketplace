class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.midlewares()
    this.routes()
  }

  midlewares () {
    this.midlewares.use(express.json)
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
