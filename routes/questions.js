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
			include: [{ model: User, attributes: ['username'] }],
			order: [['createdAt', 'DESC']],
			attributes: ['body', 'id'],
		})
		const ques = quesQuery.map(que => ({ id: que.id, username: que.User.username, body: que.body }))
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
		console.log('TEST')
		console.log(req)
		// const newQue = await Que.create({
		// authorId: res.locals.user.id,
		// body:  )
		res.json(quesQuery)
	})
)

module.exports = router
