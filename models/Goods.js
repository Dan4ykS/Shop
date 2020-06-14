const { Schema, model } = require('mongoose');
const m = require('moment')

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
      default: `img${m().format('DDMMHHmmssSSS')}`,
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
      default: `img${m().format('DDMMHHmmssSSS')}`,
    },
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = model('Goods', goods);
