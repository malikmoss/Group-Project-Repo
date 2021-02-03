const router = require('express').Router()
const { restoreUser, requireAuth } = require('../auth')
const { User } = require('../db/models')

router.get('/', restoreUser, requireAuth, (req, res) => {
	// console.log(req.session.auth.userId)
	res.render('questions')
})


module.exports = router
