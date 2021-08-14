const mongoose =require("mongoose") 
const { isEmail, isLength } = require("express-validator")

const {Schema} = mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        // validator: [ isEmail, "Email should have a valid syntax e.g: example@example.com" ]
    },
    password : {
        type : String,
        require : true,
        trim: true,
        minLength: [6, 'Password must be at least 6 character'],

    },
    image : {
        type : String, 
    }, 
    name : {
        type : String,
        trim: true,
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