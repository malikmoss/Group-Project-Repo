const router = require('express').Router()
const { asyncHandler } = require('../utils')
const { restoreUser, requireAuth } = require('../auth')
const { User, Que, Answer, Vote } = require('../db/models')
const vote = require('../db/models/vote')

router.get(
	'/',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const quesQuery = await Que.findAll({
			include:[
				{ model: User, attributes: ['username', 'id'] },
				{
					model: Answer,
					attributes: ['authorId', 'body'],
					include: [
						{ model: User, attributes: ['username'] }
					]
				},
				Vote
			],
			order: [['createdAt', 'DESC']],
			attributes: ['body', 'id'],
		})

		const ques = [];

		for (let que of quesQuery) {
			const
			queBody = que.body,
			queId = que.id,
			queAuthor = que.User.username,
			queAuthorId = que.User.id;
			let numUpvotes = que.Votes.filter(vote => vote.isUpVote === true).length;
			let numDownvotes = que.Votes.filter(vote => vote.isUpVote === false).length;

			const answers = que.Answers.map(answer => ({
				ansAuthorId: answer.authorId,
				ansAuthor: answer.User.username,
				ansBody: answer.body,
			}));

			ques.push({queId, queAuthorId, queAuthor, queBody, answers, numUpvotes, numDownvotes});
		}

		ques.sort((a, b) => b.numUpvotes - a.numUpvotes);


		// res.send(quesQuery);
		// res.send(ques)
		res.render('components/questions', {ques});
		// const ques = quesQuery.map(que => ({ id: que.id, authorId: que.User.id, author: que.User.username, body: que.body }))
		// const data = {
		// 	ques,
		// }
		// res.render('home', data)
	})
)
//GET localhost:8080/questions/:id
router.get(
	'/:id(\\d+)',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const id = Number(req.params.id)
		const que = await Que.findByPk(id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		})
		const answers = await Answer.findAll({
			where: {
				questionId: id,
			},
			attributes: ['body', 'createdAt'],
			include: [{ model: User, attributes: ['username'] }],
		})

		// res.send([answers, que])
		res.render('que', { title: que.body, que, answers })
	})
)

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
//PATCH localhost:8080/questions/:id
router.patch(
	'/:id',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const que = await Que.findByPk(req.params.id)
		que.body = req.body.newQue
		await que.save()
		res.json()
	})
)
router.delete(
	'/:id',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		;(await Que.findByPk(req.params.id)).destroy()
		res.json()
	})
)

module.exports = router
