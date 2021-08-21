const mongoose =require("mongoose") 
const { isEmail, isLength } = require("express-validator")

const {Schema} = mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type : String,
        require : true,
    },
    image : {
        type : String, 
    }, 
    name : {
        type : String,
    },
    phoneNumber: {
        type : String,
    },
    role: {
        type : String,
        enum: ['buyers', 'admin'],
        default : 'buyers'
    }
},{
    timestamps : true
});

module.exports = mongoose.model("user", UserSchema)