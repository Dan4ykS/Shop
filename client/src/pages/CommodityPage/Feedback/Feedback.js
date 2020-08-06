import React, { useEffect, useState } from 'react';
import Rating from '../../../components/Rating/Rating';
import FeedbackBtn from './FeedbackBtn';
import FeedbackStatus from './FeedbackStatus';
import { connectToStore } from '../../../utils/workWithRedux';
import {
  findUserReview,
  updateUserReview,
  updateReviews,
  clearUserReview,
  removeReview,
  updateRating,
} from '../../../actions/commodityData';
import { workWithReview } from '../../../utils/workWithApiRequests';
import { createValidImgSrc, validateInput } from '../../../utils/workWithBrowser';

const Feedback = ({
  userData: { userName, token, avatar, name },
  commodityData: { userReview, reviews, id },
  actions: { findUserReview, updateUserReview, updateReviews, clearUserReview, removeReview, updateRating },
}) => {
  const [review, updateLocalReview] = useState(userReview ? userReview.review : ''),
    [loading, changeLoading] = useState(false);

  useEffect(() => {
    findUserReview(userName, reviews);
    return () => {
      if (userReview) {
        clearUserReview();
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateLocalReview(userReview?.review ?? '');
  }, [userReview, updateLocalReview]);

  if (!userName) {
    return null;
  }

  const userData = {
      token,
      avatar,
      name,
      userName,
    },
    reviewData = {
      review,
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
    };

  return (
    <form
      className='commodityPage__feedback'
      onSubmit={(e) => workWithReview(e, reviewData, userData, funcsForUpdateReview)}
      data-remove={false}
    >
      <div className='commodityPage__feedback-contentWrapper row'>
        <div className='commodityPage__feedback-title commodityPage__blockTitle col-12'>Оставить отзыв</div>
        <div className='col-2'>
          <div className='userAvatar'>
            <img src={createValidImgSrc(avatar)} alt={`avatar-${userName}`} />
          </div>
        </div>
        <div className='col-10'>
          <div className='commodityPage__feedback-content'>
            <div className='commodityPage__feedback-content-header flexWrap_SB'>
              <div className='userName'>{name}</div>
              <div className='userRating flexWrap'>
                <span>Оцените книгу: </span>
                <Rating userRating={userReview?.rating || 0} />
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
      <div className='commodityPage__feedback-status hidenElem'>
        <FeedbackStatus loading={loading} oldReview={review} />
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
})(Feedback);
