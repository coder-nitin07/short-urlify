const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklistSchema');

const blacklistToken = async (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'Unauthorized Token' });
    }

    const IsBlacklistedToken = await BlacklistedToken.findOne({ token });
    if(IsBlacklistedToken){
        return res.status(401).json({ message: 'Token has been blacklisted. Please login again' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = blacklistToken;