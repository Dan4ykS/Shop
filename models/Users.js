const { Schema, model } = require('mongoose');
const path = require('path');
const {
  removeFromCart,
  updateCartPrices,
  addToCart,
  buyGoodsInCart,
  buyCommodity,
  updateReviewsData,
} = require('../utils/modelMethods');

const users = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    default: '',
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
    default: path.join('static', 'defaultAvatar.png'),
  },
  about: {
    type: String,
    default: '',
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
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reviews',
    },
  ],
  countReviews: {
    type: Number,
    default: 0,
  },
  boughtGoods: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Goods',
      required: true,
    },
  ],
});

users.methods.addToCart = addToCart;

users.methods.removeFromCart = removeFromCart;

users.methods.updateCartPrices = updateCartPrices;

users.methods.buyCommodity = buyCommodity;

users.methods.buyGoodsInCart = buyGoodsInCart;

users.methods.updateReviewsData = updateReviewsData;

module.exports = model('Users', users);
