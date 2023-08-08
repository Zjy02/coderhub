const connection = require('../app/database')

class CommentService {
    async create(content,momentid,userid){
        const statement = 'INSERT INTO comment (content,moment_id,user_id) VALUES(?,?,?);'
        const [result] = await connection.execute(statement,[content,momentid,userid])
        return result
    }
    async reply(content, momentid, commentid,userid){
        const statement = 'INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES(?,?,?,?);'
        const [result] = await connection.execute(statement,[content,momentid,userid,commentid])
        return result
    }
}

module.exports = new CommentService();