const { Schema, model } = require('mongoose');

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
});

module.exports = model('Reviews', reviews);
