const Genres = require('../models/Genres');
const Goods = require('../models/Goods');
const Tags = require('../models/Tags');
const Authors = require('../models/Authors');
const Users = require('../models/Users');
const { createPopuldatedData, createArrWithoutCopies } = require('./createFuncs');
const { convertArrayForClient } = require('./convertFuncs');

module.exports.updateCommodityGenresOrTags = async (newData, commodityId, type = 'genres') => {
  const Model = type === 'genres' ? Genres : Tags,
    firstFildName = type === 'genres' ? 'genre' : 'tag',
    oldCommodityData = await Model.find({ goods: commodityId });

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
          goods: [commodityId],
        });
        await newModelData.save();
      }
    }
  });
};

module.exports.updateCommodityRating = async (commodity, newRating, oldRating) => {
  await commodity.updateRating(+newRating, +oldRating);
};

module.exports.updateReviewRelatedData = async ({ userId, commodityId, rating, reviewId, oldRating = null }) => {
  const user = await Users.findById(userId),
    commodity = await Goods.findById(commodityId);

  user.updateReviewsData(reviewId);
  if (+rating >= 0 && rating <= 5) {
    await this.updateCommodityRating(commodity, rating, oldRating);
  }
  commodity.updateReviewsData(reviewId);
};

module.exports.updateAuthorData = async (author, commodityId, authorName) => {
  if (author) {
    await author.updateCommodityList(commodityId);
  } else {
    const newAuthor = new Authors({
      author: authorName,
      goods: [commodityId],
      goodsCount: 1,
    });
    await newAuthor.save();
  }
};

module.exports.updateGoodsForClient = async (arrWithData, oldDataForClient = []) => {
  let newDataForClient = [];
  for (const el of arrWithData) {
    const populatedData = await createPopuldatedData(el, 'goods');
    if (oldDataForClient.length > 0) {
      newDataForClient = createArrWithoutCopies(convertArrayForClient(populatedData.goods), [
        ...oldDataForClient,
        ...newDataForClient,
      ]);
    } else {
      newDataForClient = createArrWithoutCopies(newDataForClient, convertArrayForClient(populatedData.goods));
    }
  }
  return newDataForClient;
};
