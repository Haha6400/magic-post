const customerRouter = require('./customerRouter')


function route(app) {
      app.use('/api/orders', customerRouter)
}

module.exports = route