const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const router = require('./server/routes/index')
const jwt = require('koa-jwt')
const secret = require('./server/config/secret.json')
const filter = require('./server/filter/index')
const port = 9999
const app = new Koa()



// app.use(filter())
app.use(logger())
app.use(bodyParser())
// app.use(jwt({ secret: secret.sign }).unless({ path: [/^\/api\/login/] }))

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(port, () => {
    console.log(`
        SERVER RUNNING SUCCESS...
        REST API ADDR: http://127.0.0.1:${port}/api/
    `)
})