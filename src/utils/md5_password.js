const crypto= require('crypto')
function md5Password(passWord){

    const md5 = crypto.createHash('md5')
    // 对密码进行加密(2进制)，转化为16进制
    const md5Password = md5.update(passWord).digest('hex')
    return md5Password
}

module.exports = md5Password