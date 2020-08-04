import GoodsService from '../../../services/GoodsService';

export const updateCommodityRating = async (
  e,
  { editable, token, reviewId, commodityId, localUserRating: oldRating, userReview, name, userName, avatar },
  { changeLocalUserRating, updateUserReview, updateRating, updateReviews }
) => {
  e.persist();
  if (!editable) {
    return;
  }
  try {
    const item = e.target.closest('.rating__item'),
      ratingWrapper = item.closest('.rating'),
      value = +item.dataset.value;

    if (reviewId) {
      const { date } = await GoodsService.updateReview(reviewId, { rating: value }, token);
      updateUserReview({ rating: value });
      updateRating(value, oldRating);
      if (userReview?.review) {
        updateReviews({
          reviewDate: date,
          reviewId: userReview.reviewId,
          reviewRating: value,
        });
      }
    } else {
      const { id, date } = await GoodsService.createReview({ rating: value, commodityId }, token);
      updateUserReview({ rating: value, reviewId: id });
      updateRating(value);
      updateReviews({
        reviewId: id,
        reviewDate: date,
        reviewerName: name,
        reviewerAvatar: avatar,
        reviewer: userName,
        reviewRating: value,
      });
    }
    ratingWrapper.dataset.totalvalue = value;
    changeLocalUserRating(value);
  } catch (error) {
    alert(error);
  }
};

export const clearTotalRating = (e, editable) => {
  if (!editable) {
    return;
  }
  const ratingWrapper = e.target.closest('.rating');
  ratingWrapper.dataset.totalvalue = 0;
};

export const checkTotalRating = (e, localUserRating, editable) => {
  if (!editable) {
    return;
  }
  const ratingWrapper = e.target.closest('.rating');
  if (!+ratingWrapper.dataset.totalvalue) {
    ratingWrapper.dataset.totalvalue = localUserRating;
  }
};
