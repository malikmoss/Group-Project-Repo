const router = require('express').Router()
const { requireAuth } = require('../auth')

router.get('/', requireAuth, (req, res) => {
	res.render('questions')
})

module.exports = router
