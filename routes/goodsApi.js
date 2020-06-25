const { Router } = require('express');
const errorHandler = require('../utils/errorHandler');
const uploadFile = require('../middlewares/uploadFile.middleware');
const Goods = require('../models/Goods');
const authAdmin = require('../middlewares/authAdmin.middleware');
const { createDataUpdateObj, deleteFile, convertDataArrayForClient, convertDataForClient } = require('../utils/helpFuncs');
const User = require('../models/User');

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
    const commodity = await Goods.findById(id);
    res.status(200).json(convertDataForClient(commodity));
  } catch (error) {
    errorHandler(res, { message: `Товар с id=${id} не найден!` });
  }
});

router.post(
  '/createCommodity',
  authAdmin,
  uploadFile.fields([{ name: 'previewImg' }, { name: 'img' }]),
  async ({ body: { title, shortDescr, descr, price, previewImgAlt, previewImgId, imgAlt = null, imgId }, files }, res) => {
    try {
      const newCommodity = new Goods({
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
      };
      const oldCommodityData = await Goods.findById(id);
      const dataForUpdate = createDataUpdateObj(body, newFiles, oldCommodityData);
      await Goods.updateOne({ _id: id }, dataForUpdate);
      res.status(200).json({ message: `товар с id:${id} обновлен` });
      const {
        previewImg: { previewImgSrc },
        img: { imgSrc },
      } = oldCommodityData;
      if (newFiles?.img && imgSrc) {
        deleteFile(imgSrc.split('\\')[1]);
      }
      if (newFiles?.previewImg && previewImgSrc) {
        deleteFile(previewImgSrc.split('\\')[1]);
      }
      if (dataForUpdate?.price) {
        const owners = await User.find({ 'cart.cartItems.commodityId': id });
        owners.forEach(async (owner) => await owner.updateCartPrices(dataForUpdate.price, id));
      }
    } catch (error) {
      errorHandler(res, error);
    }
  }
);

router.delete('/removeCommodity/:id', authAdmin, async (req, res) => {
  try {
    const oldCommodityData = await Goods.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `товар с id:${req.params.id} удален` });
    if (oldCommodityData?.img?.imgSrc) {
      deleteFile(oldCommodityData.img.imgSrc.split('\\')[1]);
    }
    if (oldCommodityData?.previewImg?.previewImgSrc) {
      deleteFile(oldCommodityData.previewImg.previewImgSrc.split('\\')[1]);
    }
  } catch (error) {
    errororHandler(res, error);
  }
});

router.post('/testData', authAdmin, uploadFile.none(), async (req, res) => {
  try {
    console.log(req.body.extraData.text2);
    res.status(200);
  } catch (error) {
    errorHandler(error);
  }
});

module.exports = router;
