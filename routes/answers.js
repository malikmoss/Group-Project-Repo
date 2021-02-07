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
                { model: Que, attributes: ['id', 'body', 'authorId']},
                //  where: [body= !null]},
                { model: User, attributes: ['username', 'id'] },
				{
                    model: Comment,

                    attributes: ['authorId', 'body'],
                    include: [
                        {model: User, attributes: ['username']},
                    ]
				},
			],
			order: [['createdAt', 'DESC']],
			attributes: ['body', 'id', 'authorId'],
        })

        const answers = answerQuery.map(answer => ({question: answer.Que, id: answer.id, author: answer.User.username, body: answer.body, comments: answer.Comments
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
		const id = (req.params.id)
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
        console.log(res.locals.user.id)
        console.log(req.body.answer)
        console.log(req.body.queId,)
// 		const answer = await Answer.create({
//             questionId: req.body.queId,
//             authorId: res.locals.user.id,
// 			   body: req.body.answer,
// 		})
		res.json()
	})
)




module.exports = router
