const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    buyerDetail: {
      userId: {
        type: String,
        require: true,
      },
      address: String,
      email: String,
      firstName: String,
      lastName: String,
      phoneNumber: String,
      zip: String,
    },
    items: [
      {
        title: String,
        price: Number,
        quantity: Number,
        image: String,
        productId: {
          type: String,
          require: true,
        },
        quantity: Number,
        unitPrice: Number,
      },
    ],
    totalPrice: Number,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('order', OrderSchema);
