const { Router } = require('express');
const authAdmin = require('../middlewares/authAdmin.middleware');
const uploadFile = require('../middlewares/uploadFile.middleware');
const controller = require('../controllers/goods');

const router = Router();

router.get('/getGoods', controller.getGoods);

router.get('/newGoods', controller.newGoods);

router.get('/popularGoods', controller.popularGoods);

router.get('/getSimilarGoods/:id', controller.getSimilarGoods);

router.get('/findGoods', controller.findGoods);

router.get('/findCommodity/:id', controller.findCommodity);

router.post(
  '/createCommodity',
  authAdmin,
  uploadFile.fields([{ name: 'previewImg' }, { name: 'img' }]),
  controller.createCommodity
);

router.patch(
  '/updateCommodity/:id',
  authAdmin,
  uploadFile.fields([{ name: 'previewImg' }, { name: 'img' }]),
  controller.updateCommodity
);

router.delete('/removeCommodity/:id', authAdmin, controller.removeCommodity);

module.exports = router;
