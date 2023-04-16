const express = require("express");
const { register } = require("../middlewares/controllers/signupController");
const { login } = require("../middlewares/controllers/loginController");
const auth = require("../middlewares/authJwt")
const validateUser = require("../utils/validations/signupValidation");
const User= require("../models/user")
const router = express.Router();


router.post("/register",validateUser, async (req,res)=>{
    try {
        await register(req, res)
        res.redirect("/dashboard")
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
});

router.get("/dashboard", auth.verifyToken, async (req, res) => {
  try {
    // Retrieve the user ID from the decoded token
    const seer = req.decoded
    console.log(seer)
    const userId = seer._id;

    // Retrieve the user data from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Customize the response based on the user data
    const dashboardHtml = `<h1>Welcome, ${user.name}!</h1><p>Your email address is ${user.email}.</p>`;
    return res.status(200).send(dashboardHtml);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.post("/login",async (req,res)=>{
    try {
        await login(req,res)
    } catch (error) {
        console.error(error);
        res.status(401).send(error.message);    
    }
})

module.exports = router;
