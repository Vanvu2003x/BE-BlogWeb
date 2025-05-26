require('dotenv').config();
const jwt = require("jsonwebtoken")
const secret_key = process.env.JWT_SECRET;

exports.generateToken =(payload)=>{
    return jwt.sign({id:payload},secret_key,{
        algorithm: "HS256",
        expiresIn:"4d"
    })
}

exports.verify = (token)=>{
    try {
        return jwt.verify(token,secret_key,)
    } catch (error) {
        return null;
    }
   
}