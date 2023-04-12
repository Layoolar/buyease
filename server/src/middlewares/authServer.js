const jwt = require('jsonwebtoken')
const express = require('express')
// const app=express()
// app.use(express.json)


require("dotenv").config({path: "./env"})

function generateToken(user) {
    const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
    return token
}


function veriftyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token =authHeader && authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=> {
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

module.exports = { generateToken, veriftyToken }