const express = require('express')
const { check, validationResult } = require('express-validator')
const { handleValidationErrors, asyncHandler } = require('../utils')
const router = express.Router()
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })
const bcrypt = require('bcryptjs')
const { User } = require('../db/models')
const { loginUser, logoutUser, requireAuth, restoreUser } = require('../auth')

const validateUsername = check('username').exists({ checkFalsy: true }).withMessage('Please provide a username')

const validateEmailAndPassword = [check('email').exists({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email.'), check('password').exists({ checkFalsy: true }).withMessage('Please provide a password.')]

const validatePassword = check('password').exists({ checkFalsy: true }).withMessage('Please provide a password.')

router.get('/', (req, res) => {
	res.render('login')
})

router.post(
	'/',
	csrfProtection,
	validateUsername,
	validateEmailAndPassword,
	handleValidationErrors,
	restoreUser, // Do we need this?
	asyncHandler(async (req, res) => {
		const { username, email, password } = req.body
		const hashedPassword = await bcrypt.hash(password, 10)
		const user = await User.create({ username, email, hashedPassword })
		loginUser(req, res, user)
		res.redirect('/questions')
	})
)

router.post(
	'/login',
	csrfProtection,
	validateUsername,
	validatePassword,
	handleValidationErrors,
	restoreUser, // Come back to this
	asyncHandler(async (req, res) => {
		const { username, password } = req.body

		const user = await User.findOne({ where: { username } })

		if (user !== null) {
			const passwordsMatch = await bcrypt.compare(password, user.hashedPassword.toString())
			if (passwordsMatch) {
				loginUser(req, res, user)
				res.redirect('/questions')
			}
		}
	})
)

router.get(
	'/demo',
	csrfProtection,
	restoreUser, // Come back to this
	asyncHandler(async (req, res) => {
		const user = await User.findOne({ where: { username: 'demo' } })
		loginUser(req, res, user)
		res.redirect('/questions')
	})
)

router.get('/logout',
 restoreUser, // Come back to this
 requireAuth,
(req, res) => {
	logoutUser(req, res)
	res.redirect('/')
})

module.exports = router
