const CommentService = require('../service/comment_service')
class CommentController {
    // 发表评论
    async create(ctx,next){
        const {content,momentid} = ctx.request.body
        const { id } = ctx.user
        console.log(content,momentid,id);
       try {
        const result = await CommentService.create(content,momentid,id)
        ctx.body = {
            code:0,
            msg: '评论成功',
            result
        }
       } catch (error) {
            ctx.body = {
                code:-1,
                msg:'评论失败',
                error
            }

       }
    }
    // 回复评论
    async reply(ctx,next){
        const { momentid, content, commentid } = ctx.request.body
        const { id } = ctx.user
        try {
            const result = await CommentService.reply(content, momentid, commentid,id)
            ctx.body = {
                code:0,
                msg: '回复成功',
                result
            }
        } catch (error) {
            ctx.body = {
                code:-1,
                msg:'回复失败',
                error
            }   
        }
    }
}

module.exports = new CommentController();