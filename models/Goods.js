const { Schema, model } = require('mongoose');

const goods = new Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescr: {
    type: String,
    maxlength: 200,
    required: true,
  },
  descr: {
    type: String,
    required: true,
  },
  previewImgSrc: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
});

module.exports = model('Goods', goods);
