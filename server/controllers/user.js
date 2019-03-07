const userModel = require('../models/user')


class userController {

    static async postLogin(ctx) {
        console.log('postLogin---', ctx)
        const data = ctx.request.body
        const user = await userModel.findUserByName(data.userName)
        if (user) {
            ctx.body = {
                msg: '成功',
                data: { name: data.name },
                code: 200
            }
        } else {
            ctx.body = {
                msg: '用户名不存在',
                data: null,
                code: 301
            }
        }
    }
}


module.exports = userController