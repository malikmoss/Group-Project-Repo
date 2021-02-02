const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler')
const csrf = require('csurf');
const csrfProtection = csrf({cookie:true})

router.get("/", (req, res) => {
  res.render("login");
});

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    const { username, email, password } = req.body



}))

module.exports = router;
