const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET;

exports.authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({error: "Không có token"})
    }
    else{
        const decode = jwt.verify(token,secret_key)
        if(decode){
            req.user_id = decode.id;
            next()
        }
        else
            return res.status(403).json({error: "Token đã hết hạn"})
    }
}