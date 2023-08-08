const KoaRouter = require('@koa/router')
const FileRouter = new KoaRouter({ prefix: '/file' })
const { verifyAuth } = require('../middleware/login_middleware')
const { handleAvatar } = require('../middleware/file_middleware')
const { create } = require('../controller/file_controller')

FileRouter.post('/avatar', verifyAuth, handleAvatar, create)

module.exports = FileRouter