const userService = require('../service/user')
const utils = require('../utils/index')

class userController {

    // 全部查询
    static async getList(ctx) {
        const list = await userService.getList()
        ctx.body = {
            msg: '成功',
            data: { list },
            code: 200
        }
    }

    /**
     * 1. 模糊查询
     * 2. 指定查询哪些字段
     * 3. 倒序排序
     */
    static async getListLikeName(ctx) {
        const { userName } = ctx.params
        const list = await userService.getListLikeName(userName)
        ctx.body = {
            msg: '成功',
            data: { list },
            code: 200
        }
    }

    /**
     * 1. 模糊查询
     * 2. 指定查询哪些字段
     * 3. 倒序排序
     * 4. 分页
     */
    static async getListPage(ctx) {
        // GET => /api/user/listPage?pageNumber=1&pageSize=10&userName=wang
        let reqParam = ctx.request.query
        const list = await userService.getListPage(reqParam)
        ctx.body = {
            msg: '成功',
            data: { list },
            code: 200
        }
    }

    /**
     * 查单个对象
     */
    static async getUser(ctx) {
        // GET => /api/user/wangjianuo
        let { userName = '' } = ctx.params
        const user = await userService.getUser(userName)
        ctx.body = {
            msg: '成功',
            data: { user },
            code: 200
        }
    }

    /**
     * 增
     */
    static async saveUser(ctx) {
        const reqParam = ctx.request.body
        console.log('req----', reqParam)
        const flag = await userService.saveUser(reqParam)
        ctx.body = {
            msg: '成功',
            data: { flag },
            code: 200
        }
    }

    /**
     * 改
     */
    static async updateUser(ctx) {
        const reqParam = ctx.request.body
        const flag = await userService.updateUser(reqParam)
        ctx.body = {
            msg: '成功',
            data: { flag },
            code: 200
        }
    }

    /**
     * 删除
     */
    static async deleteUser(ctx) {
        let { userName = '' } = ctx.params
        const flag = await userService.deleteUser(userName)
        ctx.body = {
            msg: '成功',
            data: { flag },
            code: 200
        }
    }

    static async login(ctx) {
        const reqParam = ctx.request.body
        const user = await userService.getUser(reqParam.userName)
        console.log('user==', user)
        if (!user) {
            console.log('用户名不存在')
            ctx.body = {
                msg: '用户名不存在',
                data: null,
                code: 400
            }
            return
        } else if (!utils.compareSync(reqParam.userPwd, user.userPwd)) {
            console.log('密码错误')
            ctx.body = {
                msg: '密码错误',
                data: null,
                code: 400
            }
            return
        } else {
            const token = utils.createToken({ userName: user.userName })
            console.log('token')
            ctx.body = {
                msg: '成功',
                data: { token, user },
                code: 200
            }
        }
    }






}


module.exports = userController