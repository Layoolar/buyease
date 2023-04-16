const express = require("express");
const { register } = require("../middlewares/controllers/signupController");
const { login } = require("../middlewares/controllers/loginController");
// const { validateUser } = require("../utils/validations/signupValidation");
const validateUser = require("../utils/validations/signupValidation");
const router = express.Router();

router.post("/register",validateUser, async (req,res)=>{
    try {
        await register(req, res)
    } catch (error) {
        console.log(error)
        res.status(401).send(error.message)
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
