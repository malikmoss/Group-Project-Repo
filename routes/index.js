const express = require("express");
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({cookie:true})
const asyncHandler = require('express-async-handler')

router.get("/", csrfProtection, (req, res) => {
  res.render("login", {csrfToken: req.csrfToken()});
});






module.exports = router;
