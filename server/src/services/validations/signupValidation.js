const { body, validationResult } = require('express-validator');
const User = require('../../models/user');

const validateUser = [
    body('name').isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
   
    body('email')
        .isEmail().withMessage('Invalid email address')
        .custom(async (value) => {
          try {
                const user = await User.findByEmail(value);
            if (user.length > 0) {
                return Promise.reject('Email address already in use');
            }
        } catch (error) {
            if (error.code === 11000) {
                return Promise.reject('Email address already in use')
            }
            return Promise.reject('an error occored while processing your request')
        }
    }),
   
   
    body('phone')
        .matches(/^\d{11}$/).withMessage('Phone number must be 11 digits')
        .custom(async (value) => {
            try {
                const user = await User.findByPhone(value);
                if (user.length > 0) {
                    return Promise.reject('Phone number already in use');
                }
            } catch (error) {
                // handle specific error thrown when unique constraint is violated
                if (error.code === 11000) {
                    return Promise.reject('Phone number already in use');
                }
                // handle other errors
                return Promise.reject('An error occurred while processing your request');
            }
        }),


    body('address').notEmpty().withMessage('Address is required'),


    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateUser;
