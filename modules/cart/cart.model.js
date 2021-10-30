const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: String,
    items: [
      {
        productId: String,
        quantity: Number,
        unitPrice: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('cart', CartSchema);
