const { Schema, model } = require('mongoose');

const genres = new Schema({
  genre: {
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

genres.methods.addNewCommodity = async function (commodityId) {
  const index = this.goods.findIndex((commodity) => commodity.commodityId.toString() === commodityId);
  if (index === -1) {
    this.goods.push({ commodityId });
  }
  return await this.save();
};

genres.methods.removeCommodity = async function (commodityId) {
  const index = this.goods.findIndex((commodity) => commodity.commodityId.toString() === commodityId);
  if (index !== -1) {
    this.goods.splice(index, 1);
  }
  return await this.save();
};

module.exports = model('Genres', genres);
