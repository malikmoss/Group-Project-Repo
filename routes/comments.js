const router = require('express').Router()
const { asyncHandler } = require('../utils')
const { restoreUser, requireAuth } = require('../auth')
const { User, Que, Answer, Vote, Comment } = require('../db/models')


// router.get(
// 	'/',
// 	// restoreUser,
// 	// requireAuth,
// 	asyncHandler(async (req, res) => {

// 		const commentQuery = await Comment.findAll({
// 			include: [
//                 // { model: Que, attributes: ['id', 'body', 'authorId']},
//                 //  where: [body= !null]},
//                 { model: User, attributes: ['username', 'id'] },
// 				{
//                     model: Answer,

//                     attributes: ['authorId', 'body'],
//                     include: [
//                         {model: User, attributes: ['username']},
//                     ]
// 				},
// 			],
// 			order: [['createdAt', 'DESC']],
// 			attributes: ['body', 'id', 'authorId'],
//         })

//         res.send(commentQuery)

//         // const comment = commentQuery.map(comment )

//         const comment = commentQuery.map(comment => ({question: comment.Que, id: answer.id, author: answer.User.username, body: answer.body, comments: answer.Comments
//             .map(comment => ({
//                 // id: comment.id,
//                 body: comment.body,
//                 authorId: comment.authorId,
//                 username: comment.User.username

//             // }))
//         }))
//         // res.send(answers)
// 	})
// )

router.get(
	'/:id(\\d+)',
	restoreUser,
	// requireAuth,
	asyncHandler(async (req, res) => {
		const id = (req.params.id)
        const commentQuery = await Comment.findAll(
            { include: [
                { model: Answer, attributes: ['id', 'authorId', 'questionId']},
				{ model: User, attributes: ['username']},
            ],
            attributes: ['answerId', 'authorId', 'body'],
            where: { answerId: id},
        })
            res.send(commentQuery)
    }))



// // router.post(
// // 	'/',
// // 	restoreUser,
// // 	requireAuth,
// // 	asyncHandler(async (req, res) => {
// //         console.log(res.locals.user.id)
// //         console.log(req.body.answer)
// //         console.log(req.body.queId,)
// // // 		const answer = await Answer.create({
// // //             questionId: req.body.queId,
// // //             authorId: res.locals.user.id,
// // // 			   body: req.body.answer,
// // // 		})
// // 		res.json()
// // 	})
// // )


// // router.patch(
// // 	'/:id',
// // 	// restoreUser,
// // 	// requireAuth,
// // 	asyncHandler(async (req, res) => {
// // 		const answer = await Answer.findByPk(req.params.id)
// // 		answer.body = answer.body.newAnswer
// // 		await answer.save()
// // 		res.json()
// // 	})
// // )

// // router.delete(
// // 	'/:id',
// // 	// restoreUser,
// // 	// requireAuth,
// // 	asyncHandler(async (req, res) => {
// // 		(await Answer.findByPk(req.params.id)).destroy()
// // 		res.json()
// // 	})
// // )

module.exports = router
