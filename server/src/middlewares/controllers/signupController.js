const { registerUser } = require("../../services/authService");
const User = require('../../models/user');
const auth = require('../authJwt')

async function register(req, res) {
    const userData = new User(req.body);
    try {
        const result = await registerUser(userData);
        console.log(result)
        const token = auth.generateToken(result.toJSON())
        await result.save().then(
                res.status(201).send("item saved into the database")
        ).catch(error => {
            console.log(error)
            res.status(400).send("item not saved")
        })
        // console.log(token);
        
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};


module.exports = {
  register
};