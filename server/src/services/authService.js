const User = require("../models/user")
const { hashPassword } = require("../utils/authUtils");


async function registerUser(userData) {
        try {
            const hashedPassword = await hashPassword(userData.password)
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
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registerUser,
}