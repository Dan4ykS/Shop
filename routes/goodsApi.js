const { Router } = require('express');
const errorHandler = require('../utils/errorHandler');
const authAdmin = require('../middlewares/authAdmin.middleware');
const uploadFile = require('../middlewares/uploadFile.middleware');
const Goods = require('../models/Goods');
const User = require('../models/User');
const Reviews = require('../models/Reviews.js');
const Genres = require('../models/Genres');
const Tags = require('../models/Tags');
const { createDataUpdateObj } = require('../utils/createFuncs');
const { deleteFile, getValidFileName } = require('../utils/workWithFiles');
const { updateCommodityGenresOrTags } = require('../utils/updateFuncs');
const { convertDataArrayForClient, convertDataForClient } = require('../utils/convertFuncs');

const router = Router();

router.get('/getGoods', async (req, res) => {
  try {
    const goods = await Goods.find();
    res.json(convertDataArrayForClient(goods));
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get('/findGoods', async (req, res) => {
  try {
    const goods = await Goods.find({ title: req.body.title });
    res.json(convertDataArrayForClient(goods));
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get('/findCommodity/:id', async ({ params: { id } }, res) => {
  try {
    const commodity = (await Goods.findById(id)).toObject(),
      reviews = await Reviews.find({ commodity: id }),
      genres = await Genres.find({ 'goods.commodityId': id }),
      tags = await Tags.find({ 'goods.commodityId': id }),
      reviewsDataForClient = [],
      tagsDataForClient = [],
      genresDataForClient = [];

    genres.forEach((genre) => {
      genresDataForClient.push(genre.genre);
    });
    commodity.genres = genresDataForClient;

    tags.forEach((tag) => {
      tagsDataForClient.push(tag.tag);
    });
    commodity.tags = tagsDataForClient;

    if (reviews.length > 0) {
      for (const review of reviews) {
        const reviewUser = await review.populate('user').execPopulate();
        reviewsDataForClient.push({
          reviewId: review._id,
          reviewUser: reviewUser.user._doc.userName,
          reviewDate: review.date,
          review: review.review,
        });
      }
      commodity.reviews = reviewsDataForClient;
    }

    res.status(200).json(convertDataForClient(commodity));
  } catch (error) {
    errorHandler(res, { message: `Товар с id:${id} не найден!` });
  }
});

router.post(
  '/createCommodity',
  authAdmin,
  uploadFile.fields([{ name: 'previewImg' }, { name: 'img' }]),
  async (
    {
      body: { title, shortDescr, descr, price, previewImgAlt, previewImgId, genres, tags, author, imgAlt = null, imgId = null },
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
        img: files?.img
          ? {
              imgSrc: files.img[0].path,
              imgAlt,
              imgId,
            }
          : null,
      });
      await newCommodity.save();
      await updateCommodityGenresOrTags(genres, newCommodity._id);
      await updateCommodityGenresOrTags(tags, newCommodity._id, 'tags');
      res.json({ message: 'Товар был успешно добавлен!' });
    } catch (error) {
      errorHandler(res, error);
    }
  }
);

router.patch(
  '/updateCommodity/:id',
  authAdmin,
  uploadFile.fields([{ name: 'previewImg' }, { name: 'img' }]),
  async ({ body, params: { id }, files }, res) => {
    try {
      const newFiles = {
          previewImg: files?.previewImg,
          img: files?.img,
        },
        oldCommodityData = await Goods.findById(id),
        dataForUpdate = createDataUpdateObj(body, newFiles, oldCommodityData);

      await Goods.updateOne({ _id: id }, dataForUpdate);
      res.status(200).json({ message: `товар с id:${id} обновлен` });

      if (dataForUpdate?.price) {
        const owners = await User.find({ 'cart.cartItems.commodityId': id });
        owners.forEach(async (owner) => await owner.updateCartPrices(dataForUpdate.price, id));
      }

      if (dataForUpdate?.genres) {
        await updateCommodityGenresOrTags(dataForUpdate.genres, id);
      }

      if (dataForUpdate?.tags) {
        await updateCommodityGenresOrTags(dataForUpdate.tags, id, 'tags');
      }

      const {
        previewImg: { previewImgSrc },
        img: { imgSrc },
      } = oldCommodityData;

      if (newFiles?.img && imgSrc) {
        deleteFile(getValidFileName(imgSrc));
      }
      if (newFiles?.previewImg && previewImgSrc) {
        deleteFile(getValidFileName(previewImgSrc));
      }
    } catch (error) {
      errorHandler(res, error);
    }
  }
);

router.delete('/removeCommodity/:id', authAdmin, async ({ params: { id } }, res) => {
  try {
    const oldCommodityData = await Goods.findByIdAndDelete(id);
    res.status(200).json({ message: `товар с id:${id} удален` });
    await Reviews.deleteMany({ commodity: id });
    const genres = await Genres.find({ 'goods.commodityId': id });
    const tags = await Tags.find({ 'goods.commodityId': id });
    if (genres.length > 0) {
      genres.forEach(async (genre) => await genre.removeCommodity(id));
    }
    if (tags.length > 0) {
      tags.forEach(async (tag) => await tag.removeCommodity(id));
    }
    if (oldCommodityData?.img?.imgSrc) {
      deleteFile(getValidFileName(oldCommodityData.img.imgSrc));
    }
    if (oldCommodityData?.previewImg?.previewImgSrc) {
      deleteFile(getValidFileName(oldCommodityData.previewImg.previewImgSrc));
    }
  } catch (error) {
    errororHandler(res, error);
  }
});

router.post('/test', uploadFile.single(), async ({ body }, res) => {
  try {
    console.log(body);
    res.status(200).json('ок');
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
