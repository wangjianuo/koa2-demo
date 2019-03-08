const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const router = require('./server/routes/index')
const port = 9991
const app = new Koa()
const utils = require('./server/utils/index')

app.use(logger())
app.use(bodyParser())

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(port, () => {
    console.log(`
        SERVER RUNNING SUCCESS...
        REST API ADDR: http://127.0.0.1:${port}/api/
    `)
})