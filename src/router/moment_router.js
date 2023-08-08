const KoaRouter = require('@koa/router')
const {verifyAuth} = require('../middleware/login_middleware')
const {create,detail,update,list,remove,addLabels} = require('../controller/moment_controller')
const {verifyPermission} = require('../middleware/permission_middleware')
const verifyLabelExists = require('../middleware/label_middleware')
const momentRouter = new KoaRouter({prefix:'/moment'})

// 发表动态 
// {
//     content:'ikun'
// }
momentRouter.post('/',verifyAuth,create)

// 获取所有动态
// 不传 offset 和 size 默认为 offset=0，size=10
// {{baseURL}}/moment?offset=10&size=10
momentRouter.get('/',list)

// 获取某一条动态
// {{baseURL}}/moment/1  1为momentid
momentRouter.get('/:momentid',detail)

// 修改动态
// {{baseURL}}/moment/1
// {
//     "content":"我是jack干什么"
// }
momentRouter.patch('/:momentid',verifyAuth,verifyPermission,update)

// 删除动态
// {{baseURL}}/moment/38
momentRouter.delete('/:momentid',verifyAuth,verifyPermission,remove)

// 为动态添加label
momentRouter.post('/:momentid/labels',verifyAuth,verifyPermission,verifyLabelExists,addLabels)
module.exports  = momentRouter