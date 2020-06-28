const Genres = require('../models/Genres');
const Goods = require('../models/Goods');

const updateCommodityGenres = async (newGenres, commodityId) => {
  const oldCommodityGenres = await Genres.find({ 'goods.commodityId': commodityId });
  oldCommodityGenres.forEach(async (genre) => {
    const genreIndex = newGenres.findIndex((newGenre) => newGenre === genre.genre);
    if (genreIndex === -1) {
      await genre.removeCommodity(commodityId);
    }
  });
  newGenres.forEach(async (genre) => {
    const genreIndex = oldCommodityGenres.findIndex((oldGenre) => oldGenre === genre);
    if (genreIndex === -1) {
      const validGenre = await Genres.findOne({ genre });
      if (validGenre) {
        await validGenre.addNewCommodity(commodityId);
      } else {
        const newGenre = new Genres({
          genre,
          goods: [{ commodityId }],
        });
        await newGenre.save();
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
  updateCommodityGenres,
  updateCommodityRating,
};
