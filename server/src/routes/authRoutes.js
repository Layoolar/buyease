const express = require("express");
const { register } = require("../middlewares/controllers/signupController");
const { login } = require("../middlewares/controllers/loginController")
const router = express.Router();

router.post("/register", register);
router.post("/login",login)

module.exports = router;
