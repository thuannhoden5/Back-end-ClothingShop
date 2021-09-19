const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
    totalPrice: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('order', OrderSchema);
