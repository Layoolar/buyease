const User = require("../models/user")
const { hashPassword } = require("../utils/authUtils");

async function registerUser(userData) {
    const hashedPassword = await hashPassword(userData.password);
    const user = new User ({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        created: userData.createdAt,
        password: hashedPassword,
    })
    return password;
}

module.exports = {
    registerUser,
}