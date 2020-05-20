const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const errorHandler = require('../utils/errorHandler');
const uploadFile = require('../middlewares/uploadFile.middleware');
const Goods = require('../models/Goods');
const authAdmin = require('../middlewares/authAdmin.middleware');
const { createDataUpdateObj, createFilesForUpdateObj, deleteFile } = require('../utils/helpFuncs');

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
    res.status(200).json(commodity)
  } catch (error) {
    errorHandler(res, { message: `Товар с id=${id} не найден!` });
  }
});

router.post('/createCommodity', authAdmin, uploadFile.array('images'), async ({ body: { title, shortDescr, descr, previewImg, price }, files }, res) => {
  try {
    const newCommodity = new Goods({
      title,
      shortDescr,
      descr,
      previewImg: files[0].path,
      price,
      img: files ? files[1].path : null,
    });
    await newCommodity.save();
    res.json({ message: 'Товар был успешно добавлен!' });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.patch('/updateCommodity/:id', authAdmin, uploadFile.fields([{ name: 'previewImg' }, { name: 'img' }]), async ({ body, params: { id }, files }, res) => {
  try {
    const { previewImg: oldPreviewImgSrc, img: oldImgSrc } = await Goods.findById(id);
    const filesForUpfate = createFilesForUpdateObj(files.previewImg, oldPreviewImgSrc, files.img, oldImgSrc);
    const dataForUpdate = createDataUpdateObj(body, filesForUpfate);
    let filesForDelete = [];
    if ('filesForDelete' in dataForUpdate) {
      filesForDelete = dataForUpdate.filesForDelete;
      delete dataForUpdate.filesForDelete;
    }
    await Goods.findByIdAndUpdate(id, dataForUpdate);
    res.status(200).json({ message: `товар с id:${id} обновлен` });
    if (filesForDelete.length !== 0) {
      filesForDelete.forEach((fileName) => {
        deleteFile(fileName);
      });
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete('/removeCommodity/:id', authAdmin, async (req, res) => {
  try {
    await Goods.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: `товар с id:${req.params.id} удален` });
  } catch (error) {
    errres, errororHandler(res, error);
  }
});

module.exports = router;
