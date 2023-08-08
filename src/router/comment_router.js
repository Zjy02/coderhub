const KoaRouter = require('@koa/router')
const CommentController = require('../controller/comment_controller')

const {verifyAuth} = require('../middleware/login_middleware')

const CommentRouter = new KoaRouter({prefix:'/comment'})

//对动态发表评论
//接口格式
// {{baseURL}}/comment
// {
//     "content":"ikun ni gan ma", 评论的内容
//     "momentid":2 评论的id
// }
CommentRouter.post('/',verifyAuth,CommentController.create)
CommentRouter.post('/reply',verifyAuth,CommentController.reply)

module.exports  = CommentRouter
