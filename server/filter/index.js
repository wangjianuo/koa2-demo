const jwt = require('jsonwebtoken')
const secret = require('../config/secret.json')
const util = require('util')
const verify = util.promisify(jwt.verify)

/**
 * token filter
 */
function tokenFilter() {
    return async function (ctx, next) {
        try {
            const token = ctx.header.authorization
            if (token) {
                try {
                    let payload = await verify(token.split(' ')[1], secret.sign)
                    console.log('payload==', payload)
                    ctx.user = {
                        userId: payload.userId,
                        userName: payload.userName
                    }

                } catch (error) {
                    console.log('token解析失败: ', err)
                }
            }
            console.log(`token: ${token}`)
            await next()
        } catch (error) {
            if (err.status === 401) {
                ctx.body = {
                    code: -1,
                    message: '认证失败'
                }
            } else {
                err.status = 404
                ctx.body = '404'
            }
        }

    }
}



module.exports = tokenFilter