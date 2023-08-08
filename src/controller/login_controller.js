const jwt = require('jsonwebtoken')
const { privateKey, publicKey} = require('../config/screct')
const { UNAUTHORIZATION } = require('../config/error_constant')
class LoginController {
    // 颁发token
    sign(ctx,next){
        const { name, id } = ctx.user
        // 生成token
        const token = jwt.sign({id, name},privateKey,{
            expiresIn: 60*60,
            algorithm:'RS256'
        })
        
        ctx.body = { code:0, data:{id, userName:name, token}}
    }

}

module.exports = new LoginController()