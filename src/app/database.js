const mysql = require('mysql2')

//创建连接池
const connectionPool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'coderhub',
    user: 'root',
    password: '123456',
    connectionLimit: 5
})


// 如果该文件有被引入，就会尝试连接数据库
connectionPool.getConnection((err, connection) => {
    if (err) {
        console.log('数库连接失败', err);
        return
    }
    //尝试与数据库连接
    connection.connect(err => {
        if (err) {
            console.log('数据库交互失败', err)
        } else {
            console.log('数据库连接成功');
        }
    })
})


const connection = connectionPool.promise()
module.exports = connection