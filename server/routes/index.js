const Router = require('koa-router')
const UserController = require('../controllers/user')

const router = new Router({
    prefix: '/api'
})

router
    .post('/login', UserController.postLogin)
    .get('/user/list', UserController.getList)
    .post('/user/list', UserController.postList)



module.exports = router