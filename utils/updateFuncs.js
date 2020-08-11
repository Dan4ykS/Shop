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

module.exports.updateReviewRelatedData = async (review, type = 'create') => {
  const user = (await createPopuldatedData(review, 'userId')).userId,
    commodity = (await createPopuldatedData(review, 'commodityId')).commodityId,
    rating = type === 'create' ? review.rating : 0,
    oldRating = type === 'delete' ? review.rating : 0;

  // Для пользователя нужно увеличивать коллво отзывов только с оценкой, для товара нет
  await user.updateReviewsData(review._id, true);
  if (+rating >= 0 && +rating <= 5) {
    await this.updateCommodityRating(commodity, rating, oldRating);
  }
  await commodity.updateReviewsData(review._id, review.review);
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
  let dataForClient = oldDataForClient;
  for (const el of arrWithData) {
    const populatedData = await createPopuldatedData(el, 'goods');
    if (oldDataForClient.length > 0) {
      dataForClient = createArrWithoutCopies(convertArrayForClient(populatedData.goods), dataForClient);
    } else {
      dataForClient = createArrWithoutCopies(convertArrayForClient(populatedData.goods), dataForClient);
    }
  }
  return dataForClient;
};
