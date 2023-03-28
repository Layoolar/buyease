const { registerUser } = require("../services/authService");

async function register(req, res) {
    try {
        const userData = req.body;
        const result = await registerUser(userData);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};

const { login } = require("./loginController");

module.exports = {
  register, login
};