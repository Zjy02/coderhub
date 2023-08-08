const MomentService = require('../service/moment_service')

class MomentController {
    // 发表动态
    async create(ctx, next) {
        const { content } = ctx.request.body
        const { id } = ctx.user
        try {
            const result = await MomentService.create(content, id)
            ctx.body = {
                code: 0,
                message: '发表成功',
                result
            }
        } catch (error) {
            ctx.body = {
                code: -1,
                message: '发表失败',
                result: error
            }
        }
    }
    // 查询所有动态列表
    async list(ctx, next) {
        const result = await MomentService.queryList(ctx)
        ctx.body = {
            code: 0,
            result
        }
    }
    // 查询单个动态详情
    async detail(ctx, next) {
        const result = await MomentService.queryById(ctx)
        ctx.body = {
            code: 0,
            data: result[0]
        }
    }

    // 更新动态操作
    async update(ctx, next) {
        const result = await MomentService.update(ctx)
        ctx.body = {
            code: 0,
            message: '修改动态成功',
            result
        }
    }
    // 删除动态
    async remove(ctx, next) {
        const result = await MomentService.remove(ctx)
        ctx.body = {
            code: 0,
            message: '删除成功',
            result
        }
    }
    async addLabels(ctx, next) {
        const labels = ctx.labels
        const { momentid } = ctx.params
        console.log('1');
        try {
            labels.forEach(async (item) => {
                const result = await MomentService.hasLabel(momentid, item.id)
                if (!result) {
                    const result = await MomentService.addLabel(momentid, item.id)
                }
            })

            ctx.body = {
                code: 0,
                message: '添加成功'
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                message: '添加失败'
            }
        }
    }

}

module.exports = new MomentController()