const { Schema, model } = require('mongoose');

const goods = new Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescr: {
    type: String,
    maxlength: 100,
    required: true,
  },
  descr: {
    type: String,
    required: true,
  },
  previewImg: {
    type: String,
    required: true,
  },
  img: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = model('Goods', goods);
