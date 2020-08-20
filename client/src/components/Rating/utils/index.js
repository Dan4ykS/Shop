import GoodsService from '../../../services/GoodsService';
import UsersService from '../../../services/UsersService';

export const updateCommodityRating = async (
  e,
  { editable, token, reviewId, commodityId, localUserRating: oldRating, userReview, fullName, userName, avatar },
  { changeLocalUserRating, updateReviews = null, updateRating = null, updateUserReview = null, updateUserReviews = null }
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
      if (updateUserReview) {
        updateUserReview({ rating: value });
      }
      if (updateRating) {
        updateRating(value, oldRating);
      }
      if (userReview?.review && updateReviews) {
        updateReviews({
          reviewDate: date,
          reviewId: userReview.reviewId,
          reviewRating: value,
        });
      }
      if (updateUserReviews) {
        updateUserReviews({ reviewId, reviewRating: value });
      }
    } else {
      const { id, date } = await GoodsService.createReview({ rating: value, commodityId }, token);
      updateUserReview({ rating: value, reviewId: id });
      updateRating(value);
      updateReviews({
        reviewId: id,
        reviewDate: date,
        reviewerName: fullName,
        reviewerAvatar: avatar,
        reviewer: userName,
        reviewRating: value,
      });
      const { reviews } = await UsersService.getUserReviews(token);
      updateUserReviews({
        newArr: true,
        reviews,
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
