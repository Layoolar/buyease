const User = require("../models/user")
const { hashPassword } = require("../utils/authUtils");

async function registerUser(userData) {
    const password = await hashPassword(userData.password);
    return password;
}

module.exports = {
    registerUser,
}