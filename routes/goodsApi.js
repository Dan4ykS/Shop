const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const Goods = require('../models/Goods');

const router = Router();

router.get('/getGoods', async (req, res) => {
  try {
    res.json(await Goods.find());
  } catch (error) {
    res.sendStatus(500);
    throw error;
  }
});

router.get('/findGoods', async (req, res) => {
  try {
    res.json(await Goods.find({ title: req.body.title }));
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/createCommodity', async ({ body: { title, shortDescr, descr, previewImg, price, img = null } }, res) => {
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
    res.sendStatus(500);
    throw error;
  }
});

router.post('/updateCommodity', async ({ body: { id, updateData } }, res) => {
  try {
    await Goods.findByIdAndUpdate(id, updateData);
    res.status(201).json({ massage: `товар с id:${id} обновлен` });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/removeCommodity', async (req, res) => {
  try {
    await Goods.deleteOne({_id: req.body.id})
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
