const { Router } = require('express');
const errorHandler = require('../utils/errorHandler');
const uploadFile = require('../middlewares/uploadFile.middleware');
const Goods = require('../models/Goods');
const authAdmin = require('../middlewares/authAdmin.middleware');
const { createDataUpdateObj, deleteFile } = require('../utils/helpFuncs');

const router = Router();

router.get('/getGoods', async (req, res) => {
  try {
    res.json(await Goods.find());
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get('/findGoods', async (req, res) => {
  try {
    res.json(await Goods.find({ title: req.body.title }));
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get('/findCommodity/:id', async ({ params: { id } }, res) => {
  try {
    const commodity = await Goods.findById(id);
    res.status(200).json(commodity);
  } catch (error) {
    errorHandler(res, { message: `Товар с id=${id} не найден!` });
  }
});

router.post('/createCommodity', authAdmin, uploadFile.array('images'), async ({ body: { title, shortDescr, descr, price }, files }, res) => {
  try {
    const newCommodity = new Goods({
      title,
      shortDescr,
      descr,
      previewImgSrc: files[0].path,
      price,
      imgSrc: files ? files[1].path : null,
    });
    await newCommodity.save();
    res.json({ message: 'Товар был успешно добавлен!' });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.patch('/updateCommodity/:id', authAdmin, uploadFile.fields([{ name: 'previewImg' }, { name: 'img' }]), async ({ body, params: { id }, files }, res) => {
  try {
    const newFiles = {
      previewImg: files?.previewImg,
      img: files?.img,
    };
    const dataForUpdate = createDataUpdateObj(body, newFiles);
    const oldCommodityData = await Goods.findByIdAndUpdate(id, dataForUpdate);
    const { previewImgSrc, imgSrc } = oldCommodityData;
    res.status(200).json({ message: `товар с id:${id} обновлен` });
    if (newFiles?.img) {
      deleteFile(imgSrc.split('\\')[1]);
    }
    if (newFiles?.previewImg) {
      deleteFile(previewImgSrc.split('\\')[1]);
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete('/removeCommodity/:id', authAdmin, async (req, res) => {
  try {
    const oldCommodityData = await Goods.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: `товар с id:${req.params.id} удален` });
    if (oldCommodityData?.imgSrc) {
      deleteFile(oldCommodityData.imgSrc.split('\\')[1]);
    }
    if (oldCommodityData?.previewImgSrc) {
      deleteFile(oldCommodityData.previewImgSrc.split('\\')[1]);
    }
  } catch (error) {
    errres, errororHandler(res, error);
  }
});

module.exports = router;
