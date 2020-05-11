const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const errorHandler = require('../utils/errorHandler');
const uploadFile = require('../middlewares/uploadFile.middleware');
const Goods = require('../models/Goods');

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

router.post('/createCommodity', auth, uploadFile.single('image'), async ({ body: { title, shortDescr, descr, previewImg, price }, file }, res) => {
  try {
    const newCommodity = new Goods({
      title,
      shortDescr,
      descr,
      previewImg,
      price,
      img: file ? file.path : null,
    });
    await newCommodity.save();
    res.json({ massage: 'Товар был успешно добавлен!' });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.patch('/updateCommodity/:id', auth, async ({ body: { updateData }, params: { id } }, res) => {
  try {
    await Goods.findByIdAndUpdate(id, updateData);
    res.status(200).json({ massage: `товар с id:${id} обновлен` });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete('/removeCommodity/:id', auth, async (req, res) => {
  try {
    await Goods.deleteOne({ _id: req.params.id });
    res.status(200).json({ massage: `товар с id:${req.params.id} удален` });
  } catch (error) {
    errres, errororHandler(res, error);
  }
});

module.exports = router;
