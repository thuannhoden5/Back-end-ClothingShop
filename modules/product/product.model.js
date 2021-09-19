const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      require: true,
    },
    material: {
      type: String,
    },
    image: {
      type: String,
      require: true,
    },
    color: {
      type: String,
    },
    category: {
      type: String,
      require: true,
    },
    category: {
        type :String, 
        require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('product', ProductSchema);
