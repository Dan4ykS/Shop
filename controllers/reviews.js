const errorHandler = require('../utils/errorHandler');
const Reviews = require('../models/Reviews');
const { updateCommodityRating, updateReviewRelatedData } = require('../utils/updateFuncs');
const { generateDate, createPopuldatedData } = require('../utils/createFuncs');
const Goods = require('../models/Goods');
const Users = require('../models/Users');

module.exports.createReview = async ({ body: { review, commodityId, rating }, user: { userId } }, res) => {
  try {
    const newReview = new Reviews({
      userId,
      commodityId,
      review,
      rating: !rating ? null : rating,
    });
    await newReview.save();
    res.status(201).json({ message: `Отзыв для товара с id:${commodityId} создан` });
    await updateReviewRelatedData({ ...newReview.toObject(), reviewId: newReview._id });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.updateReview = async ({ body, user: { userId }, params: { id } }, res) => {
  try {
    const review = await Reviews.findById(id);
    if (review.userId.toString() !== userId) {
      return res.status(401).json({ message: 'Нет доступа к отзыву' });
    }
    await Reviews.updateOne({ _id: id }, { ...body, date: generateDate() });
    res.json({ message: 'Отзыв обновлен' });
    if (body?.rating) {
      const commodity = await Goods.findById(review.commodityId);
      await updateCommodityRating(commodity, body.rating, review.rating);
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.removeReview = async ({ user: { userId }, params: { id } }, res) => {
  try {
    const review = await Reviews.findById(id),
      user = await Users.findById(userId);
    if (review.userId.toString() !== userId && user.userName !== 'admin') {
      return res.status(401).json({ message: 'Нет доступа к отзыву' });
    }
    await Reviews.deleteOne({ _id: id });
    res.json({ message: `Отзыв с id:${id} удален` });
    await updateReviewRelatedData({ ...review.toObject(), reviewId: review._id, rating: 0, oldRating: review.rating });
  } catch (error) {
    errorHandler(res, error);
  }
};
