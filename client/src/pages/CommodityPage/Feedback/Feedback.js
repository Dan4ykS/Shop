import React, { useEffect, useState } from 'react';
import Rating from '../../../components/Rating/Rating';
import FeedbackBtn from './FeedbackBtn';
import ReviewStatus from '../../../components/ReviewStatus';
import { connectToStore } from '../../../utils/workWithRedux';
import { updateUserReviews } from '../../../actions/userData';
import { workWithReview } from '../../../utils/workWithApiRequests';
import { createValidImgSrc, validateInput } from '../../../utils/workWithBrowser';
import {
  findUserReview,
  updateUserReview,
  updateReviews,
  clearUserReview,
  removeReview,
  updateRating,
} from '../../../actions/commodityData';

const Feedback = ({
  userData: { userName, token, avatarSrc, fullName },
  commodityData: { userReview, reviews, id },
  actions: {
    findUserReview,
    updateUserReview,
    updateReviews,
    clearUserReview,
    removeReview,
    updateRating,
    updateUserReviews,
  },
}) => {
  const [review, updateLocalReview] = useState(userReview ? userReview.review : ''),
    [loading, changeLoading] = useState(false);

  useEffect(() => {
    findUserReview(userName, reviews);
    return () => clearUserReview();
  }, [userName, reviews, clearUserReview, findUserReview]);

  useEffect(() => {
    updateLocalReview(userReview?.review ?? '');
  }, [userReview, updateLocalReview]);

  if (!userName) {
    return null;
  }

  const userData = {
      token,
      avatar: avatarSrc,
      fullName,
      userName,
    },
    reviewData = {
      review: review?.trim(),
      commodityId: id,
      userReview,
    },
    funcsForUpdateReview = {
      updateReviews,
      updateUserReview,
      changeLoading,
      clearUserReview,
      removeReview,
      updateRating,
      updateUserReviews,
    };

  return (
    <form
      className='commodityPage__feedback'
      onSubmit={(e) => workWithReview(e, reviewData, userData, funcsForUpdateReview)}
      data-remove={false}
    >
      <div className='commodityPage__feedback-contentWrapper row'>
        <div className='commodityPage__feedback-title blockTitle col-12'>Оставить отзыв</div>
        <div className='col-lg-2'>
          <div className='userAvatar'>
            <img src={createValidImgSrc(avatarSrc)} alt={`avatar-${userName}`} />
          </div>
        </div>
        <div className='col-lg-10'>
          <div className='commodityPage__feedback-content'>
            <div className='commodityPage__feedback-content-header flexWrap_SB'>
              <div className='userName'>{fullName}</div>
              <div className='userRating flexWrap'>
                {window.screen.width > 575 ? <span>Оцените книгу: </span> : null}
                <Rating
                  userRating={userReview?.rating || 0}
                  commodityData={{ id: id ?? null, userReview: userReview ?? null }}
                  funcsForUpdate={{
                    updateUserReview,
                    updateReviews,
                    updateRating,
                    updateUserReviews,
                  }}
                />
              </div>
            </div>
            <textarea
              className='formControl commodityPage__feedback-content-review'
              placeholder='Понравилась книга?'
              value={review?.trimStart()}
              onChange={(e) => validateInput(e, updateLocalReview)}
            />
            <div className='invalidFeedback'>Для созадния отзыва, напишите что-нибудь о книге</div>
          </div>
        </div>
        <div className='commodityPage__feedback-btn col-12'>
          <FeedbackBtn newReview={review} />
        </div>
      </div>
      <div className='commodityPage__feedback-status hiddenElem'>
        <ReviewStatus loading={loading} oldReview={review} />
      </div>
    </form>
  );
};

export default connectToStore(['userData', 'commodityData'], {
  findUserReview,
  updateUserReview,
  updateReviews,
  clearUserReview,
  removeReview,
  updateRating,
  updateUserReviews,
})(Feedback);
