const router = require('express').Router()
const { asyncHandler } = require('../utils')
const { restoreUser, requireAuth } = require('../auth')
const { User, Que } = require('../db/models')

router.get(
	'/',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		// console.log(req.session.auth.userId) Get userid to display account info
		const quesQuery = await Que.findAll({
			include: [{ model: User, attributes: ['username'] }],
			order: [['createdAt', 'DESC']],
			attributes: ['body'],
		})

		const ques = quesQuery.map(que => ({ username: que.User.username, body: que.body }))
		const data = {
			ques,
		}
		res.render('questions', data)
	})
)

module.exports = router
