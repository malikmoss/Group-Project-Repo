const router = require('express').Router()
const { asyncHandler } = require('../utils')
const { restoreUser, requireAuth } = require('../auth')
const { User, Que } = require('../db/models')

router.get(
	'/',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const quesQuery = await Que.findAll({
			include: [{ model: User, attributes: ['username', 'id'] }],
			order: [['createdAt', 'DESC']],
			attributes: ['body', 'id'],
		})
		const ques = quesQuery.map(que => ({ id: que.id, authorId: que.User.id, author: que.User.username, body: que.body }))
		const data = {
			ques,
		}
		res.render('home', data)
	})
)

router.post(
	'/',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const question = await Que.create({
			authorId: res.locals.user.id,
			body: req.body.question,
		})
		const data = {
			author: res.locals.user.username,
			question,
		}
		res.json(data)
	})
)
router.delete(
	'/:id',
	asyncHandler(async (req, res) => {
		;(await Que.findByPk(req.params.id)).destroy()
		res.json()
	})
)

module.exports = router
