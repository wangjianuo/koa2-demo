const db = require('../config/db')
const sequelize = db.sequelize
const User = sequelize.import('../schema/user.js')

class UserModel {

    static async findUserByName(name) {
        console.log('User=', User)
        const userInfo = await User.findOne({
            where: {
                userName: name
            }
        })
        return userInfo
    }

    static async getList() {
        return await User.findAll()
    }

    static async findAllAndCount(count, offset) {
        console.log('count, offset=', count, offset)
        const list = await User.findAndCountAll({
            limit: parseInt(count),
            offset,
            where: {},
            order: [
                ['userId', 'DESC'],
            ],
            // distinct: true,
        })
        return list
    }

    // static async createUser(user) {
    //     await User.create({
    //         'user_name': user.user_name,
    //         'user_pwd': user.user_pwd,
    //         'user_del_flag': user.user_del_flag
    //     })
    //     return true
    // }

}

module.exports = UserModel