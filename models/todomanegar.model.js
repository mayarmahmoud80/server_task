const {Schema, model, Types} = require('mongoose')

const todomanagerSchema = Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    user_manager: {
        id: {
            type: Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
    },    
/*    IsAdmin:{default:false}*/

})


const TodoManager = model('todomanager', todomanagerSchema);/////////////////////

module.exports = {TodoManager}
