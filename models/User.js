const { Schema, model } = require('mongoose');
const path = require('path');
const { removeFromCart, updateCartPrices, addToCart } = require('../utils/modelMethods');

const user = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: path.join('uploads', 'defaultAvatar.png'),
  },
  about: {
    type: String,
  },
  cart: {
    cartItems: [
      {
        copies: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        commodityId: {
          type: Schema.Types.ObjectId,
          ref: 'Goods',
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    updatedPrice: {
      type: Boolean,
      default: false,
    },
  },
});

user.methods.addToCart = addToCart;

user.methods.removeFromCart = removeFromCart;

user.methods.updateCartPrices = updateCartPrices;

module.exports = model('User', user);
