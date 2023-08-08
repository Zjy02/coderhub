/**
 * 处理用户接口的逻辑
 */

const userService = require('../service/user_service')
const { queryAvatarWithUserId } = require('../service/file_service')
const fs = require('fs')
const { UPLOAD_PATH } = require('../config/path')

class UserController {
    async create(ctx, next) {
        const user = ctx.request.body
        // 验证用户信息
        const { userName, passWord } = user

        //数据库操作
        // 判断用户密码不能为空
        if (!userName || !passWord) {
            ctx.body = {
                code: -1001,
                message: '用户名或者密码不能为空'
            }
            return
        }

        // 判断用户是否存在
        const exist = await userService.findUserByName(userName)
        if (exist.length) {
            ctx.body = {
                code: -1001,
                message: '用户名已存在'
            }
            return
        }
        // 创建用户
        const result = await userService.create(user)
        ctx.body = {
            message: '创建用户成功',
            data: result
        }
    }


    async showAavatarImage(ctx, next) {
        const { userId } = ctx.params
        try {
            const avatarInfo = await queryAvatarWithUserId(userId)
            const { filename, mimetype } = avatarInfo
            ctx.type = mimetype
            ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
        } catch (error) {
            ctx.body = {
                code: -1,
                message: '获取头像失败'
            }
        }
    }
}

module.exports = new UserController()