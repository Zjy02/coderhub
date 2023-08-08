const FileService = require('../service/file_service.js')
const { updateUserAvatar } = require('../service/user_service')
const { SERVER_PORT, SERVER_HOST } = require('../config/server')
class FileController {
    async create(ctx, next) {
        const { filename, mimetype, size } = ctx.request.file
        const { id } = ctx.user
        try {
            const result = await FileService.create(id, filename, mimetype, size)
            const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
            const userAvatar = await updateUserAvatar(avatarUrl, id)
            ctx.body = {
                code: 0,
                message: '头像上传成功',
                avatarUrl
            }
        } catch (error) {
            ctx.body = {
                code: -1,
                message: '头像上传失败',
                error
            }
        }

    }
}

module.exports = new FileController()