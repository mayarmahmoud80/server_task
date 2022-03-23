const router = require('express').Router()
const {ValidateToken} =require("../Middle/validatetoken")
const { User } = require("../models/user.model");

router.get('/', ValidateToken, async (req, res) => {
    res.status(200).json({ users });
})

router.delete('/:id', ValidateToken, async (req, res) => {
    const {id} = req.params
    await User.findByIdAndDelete(id)
    res.status(200).json({msg: "User Deleted Successfully"})
})
module.exports = router