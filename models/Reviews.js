const { Schema, model } = require('mongoose');
const { generateDate } = require('../utils/helpFuncs');

const reviews = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  commodity: {
    type: Schema.Types.ObjectId,
    ref: 'Goods',
    require: true,
  },
  review: {
    type: String,
    require: true,
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
