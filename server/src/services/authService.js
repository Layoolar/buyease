const User = require("../models/user")
const { hashPassword } = require("../utils/authUtils");

async function registerUser(userData) {
    const hashedPassword = await hashPassword(userData.password);
    const user = new User ({
        _id : userData._id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        created: userData.createdAt,
        password: hashedPassword,
    })
    return user;
}

module.exports = {
    registerUser,
}