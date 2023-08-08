const LabelService = require('../service/label_service')


class LabelController {
    async create (ctx,next){
        const {name} = ctx.request.body
        try {
            const result = await LabelService.create(name)
            ctx.body = {
            code:0,
            message:'创建成功',
            result
        }
        } catch (error) {
            ctx.body = {
                code:-1,
                message:'创建评论失败'
            }
        }
    }
    async list(ctx,next){
        try {
            const result = await LabelService.list()
            ctx.body = {
                code:0,
                result
            }
        } catch (error) {
            ctx.body = {
                code:-1,
                message:'获取失败'
            }
        }

    }
}

module.exports = new LabelController();