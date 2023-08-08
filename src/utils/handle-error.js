/**
 * 处理登录错误逻辑
 */
const app = require('../app/index')
const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    NAME_IS_ALREADY_EXISTS,
    NAME_IS_NOT_EXISTS,
    PASSWORD_IS_NOT_INCORRENT,
    UNAUTHORIZATION,
    OPERATION_IS_NOT_ALLOWED
} = require('../config/error_constant')

app.on('error',(error,ctx)=>{
    let code = 0
    let message = ''
    console.log(error);
    switch (error){
        case NAME_OR_PASSWORD_IS_REQUIRED:
            code = -1001
            message = '用户名或者密码不能为空'
            break;
        case NAME_IS_ALREADY_EXISTS:
            code = -1002
            message = '用户名已经存在'
            break;
        case NAME_IS_NOT_EXISTS:
            code = -1003
            message = '用户名不存在'
            break;
        case PASSWORD_IS_NOT_INCORRENT:
            code = -1004
            message = '密码错误'
            break;
        case UNAUTHORIZATION:
            code = -1005
            message = '无效token'
            break;
        case OPERATION_IS_NOT_ALLOWED:
            code = -2001
            message = '没有操作权限'
            break;
    }
    ctx.body = {
        code,
        message
    }
})