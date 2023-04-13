const User = require('../../models/user');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const express = require('express');
const { validateUser } = require('../../utils/validations/loginValidation')
const session = require('express-session')
const auth = require('../authServer')
const app = express();


dotenv.config({ path: './.env' })

async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Validate the user input
        if (!email || !password) {
            throw new Error('Invalid login credentials');
        }

        await validateUser(req, res, () =>{});


        // Find the user in the database by their email
        const user = await User.findOne({ email });
        console.log(user)
        console.log(password, user.password)

        // Verify the user's password
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('incorrect password or pin');
        }

        // Generate JWT for the user
        const token = auth.generateToken(user.toJSON())
        console.log(token)

        res.json({ token })
    } catch (error) {
        res.status(401).send(error.message);
    }
}

module.exports = {
    login,
};
