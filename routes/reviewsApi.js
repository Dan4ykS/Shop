const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const errorHandler = require('../utils/errorHandler');
const Reviews = require('../models/Reviews');
const { updateCommodityRating } = require('../utils/updateFuncs');
const { generateDate } = require('../utils/createFuncs');

const router = Router();

router.post('/createReview', auth, async ({ body: { review, commodityId, rating }, user }, res) => {
  try {
    const newReview = new Reviews({
      user: user.userId,
      commodity: commodityId,
      review,
      rating: !rating ? null : rating,
    });
    await newReview.save();
    res.status(201).json({ message: `Отзыв для товара с id:${commodityId} создан` });
    await updateCommodityRating(commodityId, rating);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.patch('/updateReview/:id', auth, async ({ body, user: { userId }, params: { id } }, res) => {
  try {
    const review = await Reviews.findById(id);
    if (review.user.toString() !== userId) {
      return res.status(401).json({ message: 'Нет доступа к отзыву' });
    }
    await Reviews.updateOne({ _id: id }, { ...body, date: generateDate() });
    res.json({ message: 'Отзыв обновлен' });
    await updateCommodityRating(review.commodity, body?.rating, review?.rating);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete('/removeReview/:id', auth, async ({ user: { userId }, params: { id } }, res) => {
  try {
    const review = await Reviews.findById(id);
    if (review.user.toString() !== userId) {
      return res.status(401).json({ message: 'Нет доступа к отзыву' });
    }
    await Reviews.deleteOne({ _id: id });
    res.json({ message: `Отзыв с id:${id} удален` });
    await updateCommodityRating(review.commodity, 0, review?.rating);
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
