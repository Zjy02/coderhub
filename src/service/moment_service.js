const connection = require('../app/database')
class MomentService {
    async create(content, userId) {
        const statement = 'INSERT INTO `moment` (content,user_id) VALUES(?,?);'
        const [result] = await connection.execute(statement, [content, userId])
        return result
    }
    // 查询所有的动态，并显示评论数量（子查询），标签数量，发表的用户信息，动态信息
    async queryList(ctx) {
        // 用户不传offset 和 size 时，默认 0 ，10
        const { offset = 0, size = 10 } = ctx.query
        // 另一中方式SELECT *FROM `moment` LIMIT ? OFFSET ?;
        const statement = `

SELECT m.id id, m.content content, m.updateAt updateTime, m.createAt createTime,
JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt,'avatarUrl',u.avatar_url) user,
(SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id)commentCount,
(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
FROM moment m
LEFT JOIN user u ON u.id = m.user_id
LIMIT ?,?;
`;
        // 这里的参数不支持数字，需要传字符串
        const [result] = await connection.execute(statement, [String(offset), String(size)])
        return result
    }
    // 查询某一条动态，同时展示评论列表，评论数量,标签列表，发表用户的信息
    // 根据动态id查询动态
    async queryById(ctx) {
        const { momentid } = ctx.params
        const statement = `
SELECT m.id id, m.content content, m.updateAt updateTime, m.createAt createTime,
                    JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt,'avatarUrl',u.avatar_url) user,
(SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id)commentCount,
(
	SELECT 
	(
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,
				'user',JSON_OBJECT('id',cu.id,'userName',cu.name)
			)
		)
	)
	FROM comment c 
	LEFT JOIN user cu ON c.user_id = cu.id
	WHERE c.moment_id = m.id
)comments,
(
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'id',l.id,'name',l.name
		)
	)
) labels
FROM moment m
LEFT JOIN user u ON u.id = m.user_id
LEFT JOIN moment_label ml ON ml.moment_id = m.id
LEFT JOIN label l ON l.id = ml.label_id

WHERE m.id = ?
GROUP BY m.id;
`
        const [result] = await connection.execute(statement, [momentid])
        return result
    }
    // 更新动态
    async update(ctx) {
        const { momentid } = ctx.params
        const { content } = ctx.request.body
        const statement = 'UPDATE moment SET content = ? WHERE id = ?;'
        const [result] = await connection.execute(statement, [content, momentid])
        return result
    }
    // 删除动态
    async remove(ctx) {
        const { momentid } = ctx.params
        const statement = 'DELETE FROM moment WHERE id = ?;';
        const [result] = await connection.execute(statement, [momentid])
        console.log(result, 'remove');
        return result
    }
    async hasLabel(momentid, labelid) {
        const statement = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?'
        const [result] = await connection.execute(statement, [momentid, labelid])
        return result.length > 0
    }
    async addLabel(momentid, labelid) {
        const statement = 'INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);';
        const [result] = await connection.execute(statement, [momentid, labelid])
        return result
    }
}

module.exports = new MomentService()