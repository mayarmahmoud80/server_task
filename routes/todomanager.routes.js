const express = require("express");
const router = express.Router();
const {TodoManager} = require("../models/todomanegar.model");
const { User } = require("../models/user.model");
const {JWT_SECRET} = require('../config/secrets');
const { token } = require("morgan");//
const jsonwtoken  = require('jsonwebtoken')
const {ValidateToken} =require("../Middle/validatetoken")

router.get("/",ValidateToken, async (req, res) => {
    const todos = await TodoManager.find({'user_manager.id': req.user.id});
  res.json({  todos,});
});

router.get('/all', async (req, res) => {
  const todos = await TodoManager.find({})
  res.json({todos})});

router.post("/", ValidateToken , async (req, res) => { 
    const { title, content } = req.body;
    const user = req.user
    const todo = new TodoManager({
      title,
      content,
      user_manager: {
        id: user.id,
        name: user.name,
      }, });
   await todo.save();
   res.json({ todo }); });

  
router.put("/:id", ValidateToken, async (req, res) => {  
    const { id } = req.params;
    const { title, content } = req.body;
    console.log(req.todo)
    const todo = await TodoManager.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      {
        new: true,
      }
    );
      res.json({ todo });});

  router.delete("/:id", ValidateToken, async (req, res) => {
    const { id } = req.params;
    await TodoManager.findByIdAndDelete(id);
    res.json({ msg: "todo Deleted" });
  });
  
  module.exports = router;
