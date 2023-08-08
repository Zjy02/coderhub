const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login_middleware')
const { create,list } = require('../controller/label_controller')

const labelRouter = new KoaRouter({prefix:'/label'})
// 添加标签
// {{baseURL}}/label
// {
//     "name":"rap"
// }
labelRouter.post('/',verifyAuth,create)
// 展示所有的标签
// {{baseURL}}/label
labelRouter.get('/',list)


module.exports  = labelRouter