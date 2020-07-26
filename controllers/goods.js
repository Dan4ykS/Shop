const errorHandler = require('../utils/errorHandler');
const Goods = require('../models/Goods');
const Users = require('../models/Users');
const Reviews = require('../models/Reviews.js');
const Genres = require('../models/Genres');
const Tags = require('../models/Tags');
const Authors = require('../models/Authors');
const { createDataUpdateObj, createArrWithoutCopies, createPopuldatedData } = require('../utils/createFuncs');
const { deleteFile, getValidFileName } = require('../utils/workWithFiles');
const { updateCommodityGenresOrTags, updateAuthorData, updateGoodsForClient } = require('../utils/updateFuncs');
const { convertArrayForClient, convertDataForClient } = require('../utils/convertFuncs');

const findGoods = async (offset, limit, sortedParams = null) => {
  return await Goods.find()
    .sort(sortedParams)
    .skip(+offset)
    .limit(+limit);
};

module.exports.getGoods = async ({ query: { offset, limit } }, res) => {
  try {
    const goods = await findGoods(offset, limit);
    res.json(convertArrayForClient(goods));
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.bestGoods = async ({ query: { offset, limit } }, res) => {
  try {
    const goods = await findGoods(offset, limit, { 'rating.general': -1 });
    res.json(convertArrayForClient(goods));
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.newGoods = async ({ query: { offset, limit } }, res) => {
  try {
    const goods = await findGoods(offset, limit, { date: -1 });
    res.json(convertArrayForClient(goods));
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.popularGoods = async ({ query: { offset, limit } }, res) => {
  try {
    const goods = await findGoods(offset, limit, { countReviews: -1 });
    res.json(convertArrayForClient(goods));
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.findGoods = async ({ query: { q, offset, limit } }, res) => {
  try {
    const goodsData = await Goods.find({ title: { $regex: q, $options: 'i' } }),
      tagsData = await Tags.find({ tag: { $regex: q, $options: 'i' } }),
      genresData = await Genres.find({ genre: { $regex: q, $options: 'i' } }),
      authorsData = await Authors.find({ author: { $regex: q, $options: 'i' } });

    let dataForClient = [];
    if (tagsData.length > 0) {
      dataForClient = await updateGoodsForClient(tagsData);
    }
    if (genresData.length > 0) {
      dataForClient = await updateGoodsForClient(genresData, dataForClient);
    }
    if (goodsData.length > 0) {
      dataForClient = createArrWithoutCopies(convertArrayForClient(goodsData), dataForClient);
    }
    if (authorsData.length > 0) {
      dataForClient = await updateGoodsForClient(authorsData, dataForClient);
    }
    res.json(dataForClient.slice(offset, limit));
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getSimilarGoods = async ({ params: { id } }, res) => {
  try {
    const commodity = await Goods.findById(id);
    let similarGoods = [];

    for (const genre of commodity.genres) {
      const moreSimilarGoods = await Goods.find({ genres: genre, _id: { $ne: id } });
      similarGoods = createArrWithoutCopies(moreSimilarGoods, similarGoods);
      if (similarGoods.length >= 4) {
        return res.json(convertArrayForClient(similarGoods));
      }
    }
    res.json(convertArrayForClient(similarGoods));
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.findCommodity = async ({ params: { id } }, res) => {
  try {
    const commodity = await Goods.findById(id),
      reviewDataForClien = [];

    if (commodity.reviews.length) {
      const reviewData = (await createPopuldatedData(commodity, 'reviews')).reviews;
      for (const review of reviewData) {
        const reviewerData = (await createPopuldatedData(review, 'userId')).userId;
        reviewDataForClien.push({
          reviewId: review._id,
          reviewer: reviewerData.name,
          reviewerAvatar: reviewerData.avatar,
          reviewDate: review.date,
          review: review.review,
        });
      }
    }
    res.status(200).json(convertDataForClient({ ...commodity.toObject(), reviews: reviewDataForClien }));
  } catch (error) {
    errorHandler(res, { message: `Товар с id:${id} не найден!` });
  }
};

module.exports.createCommodity = async (
  {
    body: {
      title,
      shortDescr,
      descr,
      price,
      previewImgAlt,
      previewImgId,
      genres,
      tags,
      author,
      imgAlt = null,
      imgId = null,
    },
    files,
  },
  res
) => {
  try {
    const newCommodity = new Goods({
      author,
      title,
      shortDescr,
      descr,
      previewImg: {
        previewImgSrc: files.previewImg[0].path,
        previewImgAlt,
        previewImgId,
      },
      price,
      genres: [...genres],
      tags: [...tags],
      img: files?.img
        ? {
            imgSrc: files.img[0].path,
            imgAlt,
            imgId,
          }
        : null,
    });
    if (!author) {
      errorHandler(res, { message: 'Ошибка создания товара' });
      return;
    }
    await newCommodity.save();
    const authorData = await Authors.findOne({ author });
    await updateAuthorData(authorData, newCommodity._id, author);
    await updateCommodityGenresOrTags(genres, newCommodity._id);
    await updateCommodityGenresOrTags(tags, newCommodity._id, 'tags');
    res.json({ message: 'Товар был успешно добавлен!' });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.updateCommodity = async ({ body, params: { id }, files }, res) => {
  try {
    const newFiles = {
        previewImg: files?.previewImg,
        img: files?.img,
      },
      oldCommodityData = await Goods.findById(id),
      dataForUpdate = createDataUpdateObj(body, newFiles, oldCommodityData),
      { previewImg, img } = oldCommodityData;

    await Goods.updateOne({ _id: id }, dataForUpdate);
    res.status(200).json({ message: `товар с id:${id} обновлен` });
    if (dataForUpdate?.price) {
      const owners = await Users.find({ 'cart.cartItems.commodityId': id });
      owners.forEach(async (owner) => await owner.updateCartPrices(dataForUpdate.price, id));
    }
    if (dataForUpdate?.author) {
      const oldAuthor = await Authors.findOne({ goods: id }),
        newAuthor = await Authors.findOne({ author: dataForUpdate.author });
      await oldAuthor.updateCommodityList(id);
      await updateAuthorData(newAuthor, id, dataForUpdate.author);
    }
    if (dataForUpdate?.genres) {
      await updateCommodityGenresOrTags(dataForUpdate.genres, id);
    }
    if (dataForUpdate?.tags) {
      await updateCommodityGenresOrTags(dataForUpdate.tags, id, 'tags');
    }
    if (newFiles?.img && img.imgSrc) {
      deleteFile(getValidFileName(img.imgSrc));
    }
    if (newFiles?.previewImg && previewImg.previewImgSrc) {
      deleteFile(getValidFileName(previewImg.previewImgSrc));
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.removeCommodity = async ({ params: { id } }, res) => {
  try {
    const oldCommodityData = await Goods.findByIdAndDelete(id);
    res.status(200).json({ message: `товар с id:${id} удален` });
    await Reviews.deleteMany({ commodity: id });
    const genres = await Genres.find({ goods: id }),
      author = await Authors.findOne({ goods: id }),
      tags = await Tags.find({ goods: id });

    await author.updateCommodityList(id);
    genres.forEach(async (genre) => await genre.removeCommodity(id));
    tags.forEach(async (tag) => await tag.removeCommodity(id));
    if (oldCommodityData?.img?.imgSrc) {
      deleteFile(getValidFileName(oldCommodityData.img.imgSrc));
    }
    if (oldCommodityData?.previewImg?.previewImgSrc) {
      deleteFile(getValidFileName(oldCommodityData.previewImg.previewImgSrc));
    }
  } catch (error) {
    errororHandler(res, error);
  }
};
