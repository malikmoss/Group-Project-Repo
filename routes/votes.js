const router = require('express').Router()
const { restoreUser, requireAuth } = require('../auth')
const { asyncHandler } = require('../utils')
const { Vote } = require('../db/models')

//POST localhost:8080/votes
router.post(
	'/',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const vote = await Vote.create({
			isUpVote: req.body.isUpvote,
			questionId: req.body.queId,
			userId: res.locals.user.id,
		})
		res.json()
	})
)

//PATCH localhost:8080/votes/:id
router.patch(
	'/:id',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const vote = await Vote.findOne({
			where: {
				questionId: req.params.id,
				userId: res.locals.user.id,
			},
		})
		vote.isUpVote = req.body.isUpvote
		await vote.save()
		res.json()
	})
)

//DELETE localhost:8080/votes/:id
router.delete(
	'/:id',
	restoreUser,
	requireAuth,
	asyncHandler(async (req, res) => {
		const vote = await Vote.findOne({
			where: {
				questionId: req.params.id,
				userId: res.locals.user.id,
			},
		})
		await vote.destroy()
		res.json()
	})
)

module.exports = router
