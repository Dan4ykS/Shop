const { Schema, model } = require('mongoose');
const { addNewCommodity, removeCommodity } = require('../utils/modelMethods');

const tags = new Schema({
  tag: {
    type: String,
    required: true,
  },
  goods: [
    {
      commodityId: {
        type: Schema.Types.ObjectId,
        ref: 'Goods',
        require: true,
      },
    },
  ],
});

tags.methods.addNewCommodity = addNewCommodity;

tags.methods.removeCommodity = removeCommodity;

module.exports = model('Tags', tags);
