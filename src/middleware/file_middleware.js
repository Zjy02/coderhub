const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')
const uploadAvatar = multer({
    // 跟启动项目的路径有关
    dest: UPLOAD_PATH
})

const handleAvatar = uploadAvatar.single('avatar')

module.exports = { handleAvatar }