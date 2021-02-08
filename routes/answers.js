const router = require('express').Router()
const { asyncHandler } = require('../utils')
const { restoreUser, requireAuth } = require('../auth')
const { User, Que, Answer, Vote, Comment } = require('../db/models')

router.get(
	'/',
	restoreUser,
	// requireAuth,
	asyncHandler(async (req, res) => {
		const answerQuery = await Answer.findAll({
			include: [
				{ model: Que, attributes: ['id', 'body', 'authorId'] },
				//  where: [body= !null]},
				{ model: User, attributes: ['username', 'id'] },
				{
					model: Comment,

					attributes: ['authorId', 'body'],
					include: [{ model: User, attributes: ['username'] }],
				},
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
			// .map(comment => ({
			//     // id: comment.id,
			//     body: comment.body,
			//     authorId: comment.authorId,
			//     username: comment.User.username

			// }))
		}))
		res.send(answers)
	})
)

router.get(
	'/:id(\\d+)',
	restoreUser,
	// requireAuth,
	asyncHandler(async (req, res) => {
		const id = req.params.id
		const answer = await Answer.findByPk(id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		})
		const comments = await Comment.findAll({
			where: {
				answerId: id,
			},
			attributes: ['body'],
			include: [{ model: User, attributes: ['username'] }],
		})
		res.send([answer, comments])
		// res.render('que', { title: que.body, que, answers })
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
		res.json(answer)
	})
)

// router.patch(
// 	'/:id',
// 	// restoreUser,
// 	// requireAuth,
// 	asyncHandler(async (req, res) => {
// 		const answer = await Answer.findByPk(req.params.id)
// 		answer.body = answer.body.newAnswer
// 		await answer.save()
// 		res.json()
// 	})
// )

// router.delete(
// 	'/:id',
// 	// restoreUser,
// 	// requireAuth,
// 	asyncHandler(async (req, res) => {
// 		(await Answer.findByPk(req.params.id)).destroy()
// 		res.json()
// 	})
// )

module.exports = router
