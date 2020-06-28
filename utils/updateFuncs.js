const Genres = require('../models/Genres');
const Goods = require('../models/Goods');
const Tags = require('../models/Tags');

const updateCommodityGenresOrTags = async (newData, commodityId, type = 'genres') => {
  const Model = type === 'genres' ? Genres : Tags,
    firstFildName = type === 'genres' ? 'genre' : 'tag',
    oldCommodityData = await Model.find({ 'goods.commodityId': commodityId });
  
  oldCommodityData.forEach(async (el) => {
    const elemIndex = newData.findIndex((newEl) => newEl === el[firstFildName]);
    if (elemIndex === -1) {
      await el.removeCommodity(commodityId);
    }
  });
  
  newData.forEach(async (el) => {
    const elemIndex = oldCommodityData.findIndex((oldEl) => oldEl[firstFildName] === el);
    if (elemIndex === -1) {
      const needElements = await Model.findOne({ [firstFildName]: el });
      if (needElements) {
        await needElements.addNewCommodity(commodityId);
      } else {
        const newModelData = new Model({
          [firstFildName]: el,
          goods: [{ commodityId }],
        });
        await newModelData.save();
      }
    }
  });
};

const updateCommodityRating = async (commodityId, newRating, oldRating = null) => {
  if (+newRating >= 0 && +newRating < 6) {
    const reviewCommodity = await Goods.findById(commodityId);
    await reviewCommodity.updateRating(+newRating, +oldRating);
  }
};

module.exports = {
  updateCommodityGenresOrTags,
  updateCommodityRating,
};
