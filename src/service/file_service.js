const connection = require('../app/database')

class FileService {
    async create(userid, filename, mimetype, size) {
        const statement = 'INSERT INTO avatar (user_id, filename, mimetype, size) VALUES (?, ?, ?, ?);'
        const [result] = await connection.execute(statement, [userid, filename, mimetype, size])
        return result
    }
    async queryAvatarWithUserId(userId) {
        const statement = 'SELECT * FROM avatar WHERE user_id = ?'
        const [result] = await connection.execute(statement, [userId])
        return result.pop()
    }
}

module.exports = new FileService();