const {TodoManager} = require('../models/todomanegar.model') 


const Todosowner = async (req, res, next) => {
    const {id} = req.params;
    const todomanager = await TodoManager.findById(id)

    if (!todomanager) {
        return res.status(404).json({msg: "Todos Not Found"})
    }
    const user = req.user;
    if (todomanager.user_manager.id != user.id) {
        return res.status(400).json({msg: "You Are Not Allowed For This Action"})
    }
    req.todomanager = todomanager;
    next()
}
module.exports = {Todosowner}