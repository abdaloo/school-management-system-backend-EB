const jwt = require("jsonwebtoken");
require('dotenv').config({ quiet: true });

const authMiddleware = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] || req.headers.authorization;
        if(!token) return res.status(400).json({message: "Token is required"});
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({message: "Invalid token"});
    }
}

module.exports = authMiddleware;