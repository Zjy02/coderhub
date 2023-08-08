const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    NAME_IS_NOT_EXISTS,
    PASSWORD_IS_NOT_INCORRENT,
    UNAUTHORIZATION
} = require('../config/error_constant');
const md5password = require('../utils/md5_password')
const userService = require('../service/user_service');
const {publicKey } = require('../config/screct')
const jwt = require('jsonwebtoken')

// 验证用户信息
const verifyLogin = async (ctx, next) =>{
    const { userName, passWord } = ctx.request.body

    // 账户密码是否为空
    if(!userName || !passWord){
        return ctx.app.emit('error',NAME_OR_PASSWORD_IS_REQUIRED,ctx)
    }
    
    // 查询数据库，验证用户信息
    const users = await userService.findUserByName(userName)
    // 用户不存在
    const user = users[0]
    if(!user){
        return ctx.app.emit('error',NAME_IS_NOT_EXISTS,ctx)
    }

    // 密码错误
    if(user.password !== md5password(passWord)){
        return ctx.app.emit('error',PASSWORD_IS_NOT_INCORRENT,ctx)
    }
    // 将查询的用户 id name 保存在user中，在生成token的地方加入user
    ctx.user = user
    await next()
}


// 验证token
const verifyAuth = async(ctx,next)=>{

    const authorization = ctx.headers.authorization    
    // 验证token为空
        if(!authorization){
            return ctx.app.emit('error',UNAUTHORIZATION,ctx)
        }

    // 从authorization拿到token
    const token = authorization.replace('Bearer ','')
    

        try {
            // 验证token
            const result = jwt.verify(token,publicKey,{
                algorithms:['RS256']
            })
            ctx.user = result
            await next()
            // ctx.body = 'yes'
        } catch (error) {
            // 无效token,返回错误信息
            ctx.app.emit('error',UNAUTHORIZATION,ctx)
        }
        
}

module.exports = {
    verifyLogin,
    verifyAuth
}