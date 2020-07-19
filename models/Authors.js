const { Schema, model } = require('mongoose');
const path = require('path');
const { updateCommodityList } = require('../utils/modelMethods');

const authors = new Schema({
  author: {
    type: String,
    required: true,
  },
  aboutAuthor: {
    type: String,
  },
  authorImg: {
    type: String,
    default: path.join('static', 'defaultAuthorImg.png'),
  },
  goods: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Goods',
      required: true,
    },
  ],
  goodsCount: {
    type: Number,
    default: 0,
  },
});

authors.methods.updateCommodityList = updateCommodityList;

module.exports = model('Authors', authors);
