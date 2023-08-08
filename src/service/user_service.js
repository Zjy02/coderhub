/**
 * 操作数据库
 * 将用户信息从数据库中读取，或写入
 */
const connection = require('../app/database')

class UserService {
    // 创建一个新用户
    async create(user) {
        const { userName, passWord } = user

        const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?);'

        const [result] = await connection.execute(statement, [userName, passWord])
        return result
    }

    // 通过用户名查找用户
    async findUserByName(userName) {
        const statement = 'SELECT * FROM `user` WHERE name = ?;'
        const [values] = await connection.execute(statement, [userName])
        return values
    }
    async updateUserAvatar(avatarUrl, userId) {
        const statement = 'UPDATE `user` SET avatar_url = ? WHERE id = ?;'
        const [result] = await connection.execute(statement, [avatarUrl, userId])
        return result
    }
}

module.exports = new UserService()