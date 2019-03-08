const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret.json')

class Utils {
    
    /**
     * 加密
     */
    static encryption(str) {
        const salt = bcrypt.genSaltSync()
        const hashStr = bcrypt.hashSync(str, salt)
        return hashStr
    }

    /**
     * 比较加密后的字符串
     * @param {*} str1 未加密
     * @param {*} str2 已加密
     */
    static compareSync(str1, str2) {
        return bcrypt.compareSync(str1, str2)
    }

    /**
     * 生成token
     * @param {*} key key
     * @param {*} expires 过期时间 
     */
    static createToken(key, expiresIn = '1h') {
        return jwt.sign(key, secret.sign, { expiresIn })
    }

}



module.exports = Utils