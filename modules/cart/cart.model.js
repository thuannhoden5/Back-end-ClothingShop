const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
        },
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
