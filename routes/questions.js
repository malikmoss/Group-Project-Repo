const router = require('express').Router()
const { asyncHandler } = require('../utils')
const { restoreUser, requireAuth } = require('../auth')
const { User, Que, Answer } = require('../db/models')

router.get(
	'/',
	restoreUser,
	//requireAuth,
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
//GET localhost:8080/questions/:id
router.get(
'/:id(\\d+)',
restoreUser,
requireAuth,
asyncHandler(async (req, res) => {
	const id = Number(req.params.id);
	const que = await Que.findByPk(id, { include: [{
		model: User,
		attributes: ['username']}
	]});
	const answers = await Answer.findAll({
		where: {
			questionId: id
		},
		attributes: ['body', 'createdAt'],
		include: [{model: User, attributes: ['username']}]
	})

	// res.send([answers, que])
	res.render('que', { title: que.body, que, answers });
}));

//GET localhost:8080/questions/
//POST localhost:8080/questions/
router.post(
	'/',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const newQue = await Que.create({ authorId: 'FIX', body })
	})
)

module.exports = router
