const db = require('../config/db')
const sequelize = db.sequelize
const User = sequelize.import('../model/user.js')
const moment = require('moment')
const utils = require('../utils/index')


class UserService {

    static async getList() {
        return await User.findAll()
    }

    static async getListLikeName(userName = '') {
        return await User.findAll({
            where: {
                userName: {
                    $like: `%${userName}%`
                }
            },
            order: [
                ['userId', 'DESC'],
            ],
            attributes: ['user_id', 'user_name', 'user_pwd']
        })
    }

    static async getListPage(reqParam) {
        let { pageNumber = 1, pageSize = 10, userName = '' } = reqParam
        const list = await User.findAndCountAll({
            limit: parseInt(pageSize),
            offset: (parseInt(pageNumber) - 1) * parseInt(pageSize),
            where: {
                userName: {
                    $like: `%${userName}%`
                }
            },
            order: [
                ['userId', 'DESC'],
            ],
            attributes: ['user_id', 'user_name', 'user_pwd', 'user_del_flag', 'create_time', 'update_time']
            // distinct: true,
        })
        return list
    }

    static async getUser(userName) {
        return await User.findOne({
            where: {
                userName
            }
        })
    }

    static async findUserByName(name) {
        console.log('User=', User)
        const userInfo = await User.findOne({
            where: {
                userName: name
            }
        })
        return userInfo
    }

    static async saveUser(reqParam) {
        const hashUserPwd = utils.encryption(reqParam.userPwd)
        await User.create({
            'userName': reqParam.userName,
            'userPwd': hashUserPwd,
            'userDelFlag': 0,
            'createTime': moment(),
            'updateTime': moment()
        })
        return true
    }

    static async updateUser(reqParam) {
        await User.update(
            {
                'userPwd': reqParam.userPwd,
                'updateTime': moment()
            }, {
                where: {
                    'userName': reqParam.userName
                }
            }
        )
        return true
    }

    static async deleteUser(userName) {
        await User.destroy({
            where: {
                userName
            }
        })
        return true
    }


}

module.exports = UserService