/**
 * 私钥和公钥
 */
const fs = require('fs')
const path = require('path') 
// 默认情况下，相对目录和node启动路径有关
// const privateKey = fs.readFileSync('./src/config/keys/private.key')
// const publicKey = fs.readFileSync('./src/config/keys/public.key')

const privateKey = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'))
const publicKey = fs.readFileSync(path.resolve(__dirname,'./keys/public.key'))

module.exports ={
    privateKey,
    publicKey
}