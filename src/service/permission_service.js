const connection  = require('../app/database')

// 从数据库中查询动态
class PermissionService {
    async checkMoment(resourceName,resourceId,userId){
        const statement = `SELECT* FROM ${resourceName} WHERE id = ? AND user_id = ?;`;
        const [result] = await connection.execute(statement,[resourceId,userId])
        return !!result.length
    }
}

module.exports = new PermissionService()