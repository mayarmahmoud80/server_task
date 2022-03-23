const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
   /* IsAdmin: {
        type:Boolean,
        default:false
    },*/
    address: String
})

const User = mongoose.model('user', userSchema)

module.exports = { User }