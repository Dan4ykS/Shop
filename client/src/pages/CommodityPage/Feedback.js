import React, { useEffect, useState } from 'react';
import Rating from '../../components/Rating/Rating';
import { connectToStore } from '../../utils/workWithRedux';
import { findUserReview, updateUserReview, updateReviews, clearUserReview } from '../../actions/commodityData';
import { validateInput, createValidImgSrc } from '../../utils/workWithBrowser';
import { workWithReview } from '../../utils/workWithApiRequests';

const Feedback = ({
  userData: { userName, token, avatar, name },
  commodityData: { userReview, reviews, id },
  actions: { findUserReview, updateUserReview, updateReviews, clearUserReview },
}) => {
  const [review, updateLocalReview] = useState(userReview ? userReview.review : '');

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
      reviewId: userReview?.reviewId,
      commodityId: id,
    },
    funcsForUpdateReview = {
      updateReviews,
      updateUserReview,
    };

  return (
    <form
      className='commodityPage__feedback row'
      onSubmit={(e) => workWithReview(e, reviewData, userData, funcsForUpdateReview)}
    >
      <div className='commodityPage__feedback-title commodityPage__blockTitle col-12'>Оставить отзыв</div>
      <div className='col-2'>
        <div className='userAvatar'>
          <img src={createValidImgSrc(avatar)} alt={`avatar-${userName}`} />
          <div></div>
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
            value={review}
            onChange={(e) => validateInput(e, updateLocalReview)}
          />
          <div className='invalidFeedback'>Для созадния отзыва, напишите что-нибудь о книге</div>
        </div>
      </div>
      <div className='commodityPage__feedback-btn col-12'>
        {userReview?.review ? (
          <button type='submit' className='btn'>
            Изменить
          </button>
        ) : (
          <button type='submit' className='btn'>
            Опубликовать
          </button>
        )}
      </div>
    </form>
  );
};

export default connectToStore(['userData', 'commodityData'], {
  findUserReview,
  updateUserReview,
  updateReviews,
  clearUserReview,
})(Feedback);
