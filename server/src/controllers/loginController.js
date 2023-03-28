const User = require('../models/User');

async function login(req, res) {
    try {
        const { username, password } = req.body;

        // Validate the user input
        if (!username || !password) {
            throw new Error('Invalid login credentials');
        }

        // Find the user in the database by their username
        const user = await User.findOne({ username });

        // Verify the user's password
        if (!user || !user.verifyPassword(password)) {
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
