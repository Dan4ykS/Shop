const errorHandler = require('../utils/errorHandler');
const Reviews = require('../models/Reviews');
const Users = require('../models/Users');
const Goods = require('../models/Goods');
const { updateCommodityRating, updateReviewRelatedData } = require('../utils/updateFuncs');
const { generateDate } = require('../utils/createFuncs');

module.exports.createReview = async ({ body: { review, commodityId, rating }, user: { userId } }, res) => {
  try {
    if (await Reviews.findOne({ commodityId, userId })) {
      return res.status(403).json({ message: 'Вы не можете оставить больше 1 отзыва!' });
    }
    const newReview = new Reviews({
      userId,
      commodityId,
      review: !review ? null : review,
      rating: !rating ? null : rating,
    });
    await newReview.save();
    await updateReviewRelatedData({ ...newReview.toObject(), reviewId: newReview._id });
    res.status(201).json({ id: newReview._id, date: newReview.date });
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
    const newReview = await Reviews.findByIdAndUpdate(id, { ...body, date: generateDate(true) }, { new: true });
    res.json({ date: newReview.date });
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
