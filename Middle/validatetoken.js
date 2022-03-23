const {JWT_SECRET} = require('../config/secrets');
const jwt   = require('jsonwebtoken')
const ValidateToken =(req,res,next)=>{
    try {
      console.log('Validate Token ')
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt .verify(token, JWT_SECRET);
        req.user = user;
        next()
      } catch(err) {
        console.log("token error" + err)
        res.status(400).json({msg: 'Invalid User Token'})

      }
};
module.exports = {ValidateToken}