const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    order: [mongoose.Schema.Types.ObjectId],
    role: {
      type: String,
      enum: ['buyers', 'admin'],
      default: 'buyers',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('user', UserSchema);
