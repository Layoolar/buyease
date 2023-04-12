const User = require("../models/user")
const { hashPassword } = require("../utils/authUtils");
const validateUser = require("../utils/validations/signupValidation");


async function registerUser(userData) {
        try {
            await validateUser(userData);
            const hashedPassword = await hashPassword("Maestro99").then(
                (result) => {
                    console.log(result)
                }).catch(
                (error) => {
                    console.log(error)
                }
            );
            const user = new User ({
                _id : userData._id,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                address: userData.address,
                created: userData.createdAt,
                password: hashedPassword,
            })
            console.log(user)
            return user;
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    registerUser,
}