const mongoose =require("mongoose") 

const {Schema} = mongoose

const ProductSchema = new Schema({
    title  : {
        type :String, 
        unique : true,
        require: true,
    },
    material : {
        type : String,
    },
    image : {
        type : String, 
        require: true,
    }, 
    color  : {
        type : String,
    },
    price: {
        type : String,
        require: true,
    }
},{
    timestamps : true
});

module.exports = mongoose.model("product", ProductSchema)