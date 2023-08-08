/**
 * 用户接口：
 *   用户注册
 */
const Router = require('@koa/router')
const userRouter = new Router({ prefix: '/users' })
const { showAavatarImage, create } = require('../controller/user_controller')
const { verifyuser, handlePassword } = require('../middleware/user_middleware')


// 用户注册
// {
//     "userName":"zjy",
//     "passWord":"123456"
// }
userRouter.post('/', verifyuser, handlePassword, create)

//查看指定用户头像
// { { baseURL } } /users/avatar / 1
userRouter.get('/avatar/:userId', showAavatarImage)


module.exports = userRouter