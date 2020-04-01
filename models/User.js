const { Schema, model } = require('mongoose');

const user = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    cartItems: [
      {
        copies: {
          type: Number,
          required: true,
          default: 1
        },
        commodityId: {
          type: Schema.Types.ObjectId,
          ref: 'Goods',
          required: true
        }
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = model('User', user);
