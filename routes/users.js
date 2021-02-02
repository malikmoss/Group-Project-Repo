const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../utils");
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({cookie:true});
const bcrypt = require('bcryptjs');
const { User } = require('../db/models');
const { loginUser } = require('../auth');


const validateUsername =
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username");

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
];


router.get("/", (req, res) => {
  res.render("login");
});


router.post('/',
  csrfProtection,
  validateUsername,
  validateEmailAndPassword,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });
    loginUser(req, res, user);
    res.redirect('/')
}))

module.exports = router;
