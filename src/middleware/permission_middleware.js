const PermissionService = require('../service/permission_service')
const {OPERATION_IS_NOT_ALLOWED} = require('../config/error_constant')

// 使用该需要接口地址要以库表的名字开头，以结尾 如 /:momentid
// 验证用户的身份，判断是否与发动态的人一致
const verifyPermission = async(ctx,next)=>{
        // 获取用户id
        const {id} = ctx.user
        const keyName = Object.keys(ctx.params)[0]
        const resourceId = ctx.params[keyName]
        const resourceName = keyName.replace('id','')
        
        const result = await PermissionService.checkMoment(resourceName,resourceId,id)
        if(result){
            await next()
        }else{
            ctx.app.emit('error',OPERATION_IS_NOT_ALLOWED,ctx)
        }
        
}

module.exports = {
    verifyPermission
}