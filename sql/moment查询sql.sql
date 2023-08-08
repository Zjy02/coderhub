SELECT m.id id, m.content content, m.updateAt updateTime, m.createAt createTime,
JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user,
(SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id)commentCount,
(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
FROM moment m
LEFT JOIN user u ON u.id = m.user_id
LIMIT 0,10;



-- 查询详细的动态，展示动态详情，发表用户的信息，评论数量吗，评论列表，label列表
SELECT m.id id, m.content content, m.updateAt updateTime, m.createAt createTime,
                    JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user,
(SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id)commentCount,
(
	JSON_ARRAYAGG(JSON_OBJECT(
		'id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,
		'user',JSON_OBJECT('id',cu.id,'userName',cu.name)
	))
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
LEFT JOIN comment c ON c.moment_id = m.id
LEFT JOIN user cu ON cu.id = c.user_id

-- 会根据与上面连接的结果在进行左连接，导致会出现重复label数据
LEFT JOIN moment_label ml ON ml.moment_id = m.id
LEFT JOIN label l ON l.id = ml.label_id

WHERE m.id = 5
GROUP BY m.id;



-- 查询详细动态 谁用子查询
SELECT m.id id, m.content content, m.updateAt updateTime, m.createAt createTime,
                    JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user,
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

WHERE m.id = 5
GROUP BY m.id;