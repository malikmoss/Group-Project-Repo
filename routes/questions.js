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


// router.get('/search', async (res, req) => {
// 	const searchQuery = req
// 	console.log(searchQuery)
// 	const parse = parseInt()
// 	Ques.findAll({
// 		where: que
// 	})
// })

//GET localhost:8080/questions/
//POST localhost:8080/questions/
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
