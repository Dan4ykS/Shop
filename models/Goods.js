const { Schema, model } = require('mongoose');
const { updateRating } = require('../utils/modelMethods');

const goods = new Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescr: {
    type: String,
    maxlength: 300,
    required: true,
  },
  descr: {
    type: String,
    required: true,
  },
  previewImg: {
    previewImgSrc: {
      type: String,
      required: true,
    },
    previewImgAlt: {
      type: String,
      required: true,
    },
    previewImgId: {
      type: String,
    },
  },
  img: {
    imgSrc: {
      type: String,
    },
    imgAlt: {
      type: String,
    },
    imgId: {
      type: String,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    general: {
      type: Number,
      default: 0,
    },
    fiveStars: {
      type: Number,
      default: 0,
    },
    fourStars: {
      type: Number,
      default: 0,
    },
    threeStars: {
      type: Number,
      default: 0,
    },
    twoStars: {
      type: Number,
      default: 0,
    },
    oneStar: {
      type: Number,
      default: 0,
    },
  },
  author: {
    type: String,
    require: true,
  },
});

goods.methods.updateRating = updateRating

module.exports = model('Goods', goods);
