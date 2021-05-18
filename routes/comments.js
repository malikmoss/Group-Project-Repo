const router = require('express').Router()
const { asyncHandler } = require('../utils')
const { restoreUser, requireAuth } = require('../auth')
const { User, Que, Answer, Vote, Comment } = require('../db/models')

router.get(
	'/:id(\\d+)',
	restoreUser,
	// requireAuth,
	asyncHandler(async (req, res) => {
		const id = req.params.id
		const commentQuery = await Comment.findAll({
			include: [
				{ model: Answer, attributes: ['id', 'authorId', 'questionId'] },
				{ model: User, attributes: ['username'] },
			],
			attributes: ['answerId', 'authorId', 'body'],
			where: { answerId: id },
		})
		res.send(commentQuery)
	})
)

module.exports = router
