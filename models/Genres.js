const { Schema, model } = require('mongoose');
const { addNewCommodity, removeCommodity } = require('../utils/modelMethods');

const genres = new Schema({
  genre: {
    type: String,
    required: true,
  },
  goods: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Goods',
      require: true,
    },
  ],
});

genres.methods.addNewCommodity = addNewCommodity;

genres.methods.removeCommodity = removeCommodity;

module.exports = model('Genres', genres);
