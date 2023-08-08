/**
 * 自动注册路由
 */
const fs = require('fs')

function registRouters(app){
    // 读取当前目录文件夹里面的文件
    const files = fs.readdirSync(__dirname)
    console.log(files);
    for(const file of files ){
        if(!file.endsWith('_router.js')) continue
        // 导入router
        const router = require(`./${file}`)
        app.use(router.routes())
        app.use(router.allowedMethods())
    }
} 

module.exports = registRouters