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

    static async getList(ctx) {
        const list = await userModel.getList()
        ctx.body = {
            msg: '成功',
            data: { list },
            code: 200
        }
    }

    static async postList(ctx) {
        console.log('ctx=', ctx)
        // let { currentPage = 1, count = 10 } = ctx.request.header;
        let { currentPage = 1, count = 10 } = ctx.request.body;
        console.log('currentPage', currentPage)
        console.log('count', count)
        let offset = (currentPage - 1) * count;
        const list = await userModel.findAllAndCount(count, offset)
        console.log('post user list =', list)
        ctx.body = {
            msg: '成功',
            data: { list },
            code: 200
        }
    }


}


module.exports = userController