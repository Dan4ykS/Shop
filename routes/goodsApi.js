const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const errorHandler = require('../utils/errorHandler');
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

router.post('/createCommodity', auth, async ({ body: { title, shortDescr, descr, previewImg, price, img = null } }, res) => {
  try {
    const newCommodity = new Goods({
      title,
      shortDescr,
      descr,
      previewImg,
      price,
      img,
    });
    await newCommodity.save();
    res.json({ massage: 'Товар был успешно добавлен!' });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.patch('/updateCommodity', auth, async ({ body: { id, updateData } }, res) => {
  try {
    await Goods.findByIdAndUpdate(id, updateData);
    res.status(200).json({ massage: `товар с id:${id} обновлен` });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete('/removeCommodity', auth, async (req, res) => {
  try {
    await Goods.deleteOne({ _id: req.body.id });
    res.status(204).json({ massage: `товар с id:${req.body.id} удален` });
  } catch (error) {
    errres, errororHandler(res, error);
  }
});

module.exports = router;
