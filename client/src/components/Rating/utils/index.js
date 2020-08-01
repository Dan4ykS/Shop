import GoodsService from '../../../services/GoodsService';

export const updateCommodityRating = async (
  e,
  { editable, userToken, reviewId, commodityId, localUserRating: oldRating },
  { changeLocalUserRating, updateUserReview, updateRating }
) => {
  e.persist();
  if (!editable) {
    return;
  }
  try {
    const item = e.target.closest('.rating__item'),
      ratingWrapper = item.closest('.rating'),
      value = +item.dataset.value;

    ratingWrapper.dataset.totalvalue = value;
    if (reviewId) {
      const reviewData = await GoodsService.updateReview(reviewId, { rating: value }, userToken);
      updateUserReview({ rating: value });
      // updateReviews({ ...reviewData, reviewRating: value });
      updateRating(value, oldRating);
    } else {
      const reviewData = await GoodsService.createReview({ rating: value, commodityId }, userToken);
      updateUserReview({ rating: value });
      // updateReviews({ ...reviewData, reviewRating: value });
      updateRating(value);
    }
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
