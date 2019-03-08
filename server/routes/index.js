const Router = require('koa-router')
const UserController = require('../controller/user')

const router = new Router({
    prefix: '/api'
})

router
    .get('/user/list', UserController.getList)
    .get('/user/listPage', UserController.getListPage)
    .get('/user/:userName', UserController.getUser)
    .get('/user/list/:userName', UserController.getListLikeName)
    .post('/user/save', UserController.saveUser)
    .put('/user/update', UserController.updateUser)
    .delete('/user/:userName', UserController.deleteUser)
    .post('/login', UserController.login)


module.exports = router