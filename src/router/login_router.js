const KoaRouter = require('@koa/router')

const LoginController = require('../controller/login_controller')
const {verifyAuth,verifyLogin} = require('../middleware/login_middleware')

const loginRouter = new KoaRouter({prefix:'/login'})

// 登录接口
// {
//     userName:'tom',
//     passWord:'123456'
// }
loginRouter.post('/',verifyLogin,LoginController.sign)

// 测试接口 测试拿到token是否能验证
loginRouter.post('/test',verifyAuth,(ctx,next)=>{
    ctx.body = {
        message:'测试成功'
    }
})

module.exports  = loginRouter
