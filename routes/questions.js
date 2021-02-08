const router = require('express').Router()
const { asyncHandler } = require('../utils')
const { restoreUser, requireAuth } = require('../auth')
const { User, Que, Answer, Comment, Vote } = require('../db/models')
const { Op } = require('sequelize');

//GET localhost:8080/questions
router.get(
	'/',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const quesQuery = await Que.findAll({
			include: [
				// { model: Vote, attributes: ['isUpVote']},
				{ model: User, attributes: ['username', 'id'] },
				{ model: Answer, attributes: ['authorId', 'body'],
					include: [
						{ model: User, attributes: ['username'] },
						{ model: Comment, attributes: ['authorId', 'body'],
							include: [{ model: Answer, attributes: ['authorId'] }],
						},
					],
				},
				Vote,
			],
			order: [['createdAt', 'DESC']],
			attributes: ['body', 'id'],
		})

		const userVotesQuery = await Vote.findAll({
			attributes: ['questionId', 'isUpVote'],
			where: [{ userId: res.locals.user.id }],
		})

		const userVotes = userVotesQuery.map(vote => ({
			id: vote.questionId,
			isUpvote: vote.isUpVote,
		}))

		const ques = []

		for (let que of quesQuery) {
			const queBody = que.body,
				queId = que.id,
				queAuthor = que.User.username,
				queAuthorId = que.User.id
			let numUpvotes = que.Votes.filter(vote => vote.isUpVote === true).length
			let numDownvotes = que.Votes.filter(vote => vote.isUpVote === false).length

			const answers = que.Answers.map(answer => ({
				ansAuthorId: answer.authorId,
				ansAuthor: answer.User.username,
				ansBody: answer.body,
				comment: answer.Comments.map(comment => ({
					body: comment.body,
					authorId: comment.authorId,
				})),
			}))
			ques.push({ queId, queAuthorId, queAuthor, queBody, answers, numUpvotes, numDownvotes })
		}
		ques.sort((a, b) => b.numUpvotes / b.numDownvotes - a.numUpvotes / a.numDownvotes)

		// res.send(ques)

		res.render('home', { ques, userVotes })
		// res.send(quesQuery);
		// res.send(ques)
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
		const id = req.params.id
		const que = await Que.findByPk(id, {
			include: [
				{ model: User, attributes: ['username'],
				},
			],
			Vote,
		})
		const answers = await Answer.findAll({
			where: {
				questionId: id,
			},
			attributes: ['body', 'createdAt', 'id'],
			include: [{ model: User, attributes: ['username'] }],
		})
			const votesQuery = await Vote.findAll({
			attributes: ['questionId', 'isUpVote'],
			where: {
				questionId: id
			}
		})

		// res.send(votesQuery)
		const votes = votesQuery.map(vote => ({
			question: vote.questionId,
			isUpvote: vote.isUpVote
		}))
		let numUpvotes = votes.filter(vote => vote.isUpvote === true).length
		let numDownvotes = votes.filter(vote => vote.isUpvote === false).length

		console.log(votes)
		// res.send(votes)
		res.render('que', { title: que.body, que, answers, numUpvotes, numDownvotes })
	})
)

//GET localhost:808/questions/search
router.get('/search', async (req, res) => {
	const searchQuery = req.query.q.trim();
	let searchResult;

	if (searchQuery) {
		searchResult = await Que.findAll({
			where: {
				body: {
					[Op.iLike]: `%${searchQuery}%`
				}
			}
		})
	}


	if (searchResult.length > 0) {
		const queIds = searchResult.map(que => que.id);
		const quesQuery = await _getQues(queIds);
		const ques = _structureQueryData(quesQuery);
		res.render('home', { ques })
	} else {
		res.render('search-not-found', {search: searchQuery})
	}
})

async function _getQues(ids) {
	const quesQuery = await Que.findAll({
		where: {
			id: [...ids]
		},
		include: [
			{ model: User, attributes: ['username', 'id'] },
			{
				model: Answer,
				attributes: ['authorId', 'body'],
				include: [{ model: User, attributes: ['username'] }],
			},
			Vote,
		],
		order: [['createdAt', 'DESC']],
		attributes: ['body', 'id'],
	})

	return quesQuery;
}

function _structureQueryData(quesQuery) {
	const ques = []

	for (let que of quesQuery) {
		const queBody = que.body,
			queId = que.id,
			queAuthor = que.User.username,
			queAuthorId = que.User.id
		let numUpvotes = que.Votes.filter(vote => vote.isUpVote === true).length
		let numDownvotes = que.Votes.filter(vote => vote.isUpVote === false).length

		const answers = que.Answers.map(answer => ({
			ansAuthorId: answer.authorId,
			ansAuthor: answer.User.username,
			ansBody: answer.body,
		}))
		ques.push({ queId, queAuthorId, queAuthor, queBody, answers, numUpvotes, numDownvotes })
	}
	return ques.sort((a, b) => b.numUpvotes - a.numUpvotes)
}


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
//DELETE localhost:8080/questons/:id
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
