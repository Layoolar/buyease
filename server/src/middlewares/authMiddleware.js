const jwt = require('jsonwebtoken')
require("dotenv").config({path: "./env"})

function generateToken(user) {
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
    return accessToken
}

function veriftyToken(req,res,next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token,'secret-key', (err,user)=> {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user ;
            next(); 
        });
    } else {
        res.sendStatus(401);
    }
}