const router = require('express').Router()
const { asyncHandler } = require('../utils')
const { restoreUser, requireAuth } = require('../auth')
const { User, Que, Answer, Vote, Comment } = require('../db/models')

router.get(
	'/',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const answerQuery = await Answer.findAll({
			include: [
				{ model: Que, attributes: ['id', 'body', 'authorId'] },
				{ model: User, attributes: ['username', 'id'] },
				{ model: Comment, attributes: ['authorId', 'body'], include: [{ model: User, attributes: ['username'] }] },
			],
			order: [['createdAt', 'DESC']],
			attributes: ['body', 'id', 'authorId'],
		})

		const answers = answerQuery.map(answer => ({
			question: answer.Que,
			id: answer.id,
			author: answer.User.username,
			body: answer.body,
			comments: answer.Comments,
		}))
		res.send(answers)
	})
)

router.get(
	'/:id(\\d+)',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const id = req.params.id
		const answer = await Answer.findByPk(id, { include: [{ model: User, attributes: ['username'] }] })
		const comments = await Comment.findAll({
			where: { answerId: id },
			attributes: ['body'],
			include: [{ model: User, attributes: ['username'] }],
		})
		res.send([answer, comments])
	})
)

router.post(
	'/',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const answer = await Answer.create({
			authorId: res.locals.user.id,
			questionId: req.body.queId,
			body: req.body.text,
		})
		res.json({ answer, username: res.locals.user.username })
	})
)
router.delete(
	'/:id',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const success = await Answer.destroy({
			where: { id: req.params.id },
		})

		res.json(`Deleted ${success} answers`, success ? 200 : 500)
	})
)

module.exports = router
