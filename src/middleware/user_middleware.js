/**
 * 处理用户的错误信息的中间件
 */
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require('../config/error_constant')
const userService = require('../service/user_service')
const md5Password = require('../utils/md5_password')

const verifyuser = async (ctx, next) => {
    const { userName, passWord } = ctx.request.body
    // 传过来的用户名或者密码是否为空
    if (!userName || !passWord) {
        return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    }

    // 判断用户是否存在
    const exist = await userService.findUserByName(userName)
    if (exist.length) {
        return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
    }
    await next()
}
async function handlePassword(ctx, next) {
    const { passWord } = ctx.request.body
    ctx.request.body.passWord = md5Password(passWord)
    await next()
}


module.exports = { verifyuser, handlePassword }

