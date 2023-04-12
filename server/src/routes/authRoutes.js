const express = require("express");
const { register } = require("../middlewares/controllers/signupController");
const { login } = require("../middlewares/controllers/loginController")
const router = express.Router();

router.post("/register", register);
router.post("/login",async (req,res)=>{
    try {
        await login(req,res)
    } catch (error) {
        console.error(error);
        res.status(401).send(error.message);    
    }
})

module.exports = router;
