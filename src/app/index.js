const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registRouters = require( '../router')

const app = new Koa()
app.use(bodyParser())

registRouters(app)
module.exports = app