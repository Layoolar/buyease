const User = require('../models/user');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const express = require('express');
const validateUser = require('./validations/loginValidation')
const session = require('express-session')
const app = express();

dotenv.config({ path: './.env' })

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true

}));

async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Validate the user input
        if (!username || !password) {
            throw new Error('Invalid login credentials');
        }

        await validateUser(req, res, () =>{});


        // Find the user in the database by their username
        const user = await User.findOne({ username });

        // Verify the user's password
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid login credentials');
        }

        // Create a session for the user
        req.session.userId = user._id;

        // Redirect the user to their dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(401).send(error.message);
    }
}

module.exports = {
    login,
};
