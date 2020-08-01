const { Schema, model } = require('mongoose');
const { generateDate } = require('../utils/createFuncs');

const reviews = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    require: true,
  },
  commodityId: {
    type: Schema.Types.ObjectId,
    ref: 'Goods',
    require: true,
  },
  review: {
    type: String,
  },
  date: {
    type: String,
    default: generateDate(),
  },
  rating: {
    type: Number,
  },
});

module.exports = model('Reviews', reviews);
