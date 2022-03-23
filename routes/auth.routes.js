
const express = require("express");
const bcrypt_password = require("bcrypt");
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/secrets')
const router = express.Router();
const {UserDto} = require('../dto/user.dt')
const {ValidateToken} =require("../Middle/validatetoken")
const {Todosowner}=require("../Middle/todosowner")
const { User } = require("../models/user.model");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({msg: "no user with this email"})
  const PasswordVerify = bcrypt_password.compareSync(password, user.password);
  if (!PasswordVerify) return res.json({msg: "error password "})
  const userData = UserDto(user);

const token = jwt.sign(userData, JWT_SECRET);
res.json({user: userData, token})
});
 
router.post("/signup", async (req, res) => {
const { name, email, password, phone, address} = req.body;
  const FoundUs = await User.findOne({email})
  if (FoundUs) {
    return res.status(404).json({msg: "Exist User ",})
  }
  const user = new User({
    name,
    email,
    phoneNumber: phone,
    address
  });
  const hashedPassword = bcrypt_password.hashSync(password, 10)
  user.password = hashedPassword;
  await user.save()
  res.status(200).json({user: UserDto(user)})
});
module.exports = router;