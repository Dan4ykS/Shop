import React, { useState } from 'react';
import Rating from '../../../components/Rating/Rating';
import { createValidImgSrc, validateInput } from '../../../utils/workWithBrowser';
import { workWithReview } from '../../../utils/workWithApiRequests';
import { connectToStore } from '../../../utils/workWithRedux';
import {
  updateReviews,
  updateUserReview,
  clearUserReview,
  removeReview,
  updateRating,
} from '../../../actions/commodityData';
import ReviewStatus from '../../../components/ReviewStatus';
import { setDataRemove } from '../../CommodityPage/utils';

const Review = ({
  data: { commodityImg, commodityTitle, reviewRating: rating, review, commodityId, reviewId },
  userData: { token, avatarSrc, fullName, userName },
  actions: { updateReviews, updateUserReview, clearUserReview, removeReview, updateRating },
}) => {
  const [locaReviewData, updateLocalReviewData] = useState(review),
    [loading, changeLoading] = useState(false),
    reviewData = {
      review: locaReviewData,
      commodityId,
      userReview: {
        rating,
        reviewId,
      },
    },
    userData = {
      token,
      avatar: avatarSrc,
      fullName,
      userName,
    },
    funcsForUpdateReview = {
      updateReviews,
      updateUserReview,
      changeLoading,
      clearUserReview,
      removeReview,
      updateRating,
    };

  console.log(locaReviewData.trim());

  return (
    <form
      className='accountPage__reviews-item row'
      onSubmit={(e) => workWithReview(e, reviewData, userData, funcsForUpdateReview)}
      data-remove={false}
    >
      <div className='accountPage__reviews-item-img flexWrapColumn_center col-2'>
        <img src={createValidImgSrc(commodityImg)} alt={`avatar-${false}`} />
      </div>
      <div className='accountPage__reviews-item-content col-10'>
        <div className='review__header flexWrap_SB'>
          <div className='review__header-title'>Книга "{commodityTitle}"</div>
          <div className='review__header-rating'>
            <Rating
              userRating={rating}
              commodityData={{
                id: commodityId,
                userReview: {
                  review,
                  rating,
                  reviewId,
                },
              }}
            />
          </div>
        </div>
        <textarea
          className='review__text formControl'
          value={locaReviewData.trimStart()}
          onChange={(e) => validateInput(e, updateLocalReviewData)}
        />
        <div className='btnGroup_right'>
          <button
            type='submit'
            className='btn'
            disabled={locaReviewData.trim() === review || !locaReviewData.trim() ? true : false}
          >
            Изменить
          </button>
          <button type='submit' className='btn' onClick={(e) => setDataRemove(e, '.commodityPage__feedback')}>
            Удалить
          </button>
        </div>
      </div>
      <div className='accountPage__reviews-item-reviewStatus hiddenElem'>
        <ReviewStatus loading={loading} oldReview={review} />
      </div>
    </form>
  );
};

export default connectToStore(['userData'], {
  updateReviews,
  updateUserReview,
  clearUserReview,
  removeReview,
  updateRating,
})(Review);
