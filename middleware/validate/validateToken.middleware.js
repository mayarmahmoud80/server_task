const jwt = require("jsonwebtoken");
const {JWT_SECRET}  = require('../../config/secrets')

const ValidateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next()
  } catch (err) {
    console.log(err)
    res.status(403).json({ msg: "Invalid Token" });
  }
};

module.exports = { ValidateToken };
