import React, { useEffect, useState } from 'react';
import Rating from '../../components/Rating/Rating';
import LoadingIndicator from '../../components/LoadingIndicator';
import { connectToStore } from '../../utils/workWithRedux';
import { findUserReview, updateUserReview, updateReviews, clearUserReview } from '../../actions/commodityData';
import { validateInput, createValidImgSrc } from '../../utils/workWithBrowser';
import { workWithReview } from '../../utils/workWithApiRequests';
import { hideFeedbackStatus } from './utils';

const Feedback = ({
  userData: { userName, token, avatar, name },
  commodityData: { userReview, reviews, id },
  actions: { findUserReview, updateUserReview, updateReviews, clearUserReview },
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
      reviewId: userReview?.reviewId,
      commodityId: id,
    },
    funcsForUpdateReview = {
      updateReviews,
      updateUserReview,
      changeLoading,
    };

  return (
    <form
      className='commodityPage__feedback'
      onSubmit={(e) => workWithReview(e, reviewData, userData, funcsForUpdateReview)}
    >
      <div className='commodityPage__feedback-contentWrapper row'>
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
              value={review?.trimStart()}
              onChange={(e) => validateInput(e, updateLocalReview)}
            />
            <div className='invalidFeedback'>Для созадния отзыва, напишите что-нибудь о книге</div>
          </div>
        </div>
        <div className='commodityPage__feedback-btn col-12'>
          {userReview?.review ? (
            <button type='submit' className='btn' disabled={userReview.review.trim() === review.trim() ?? false}>
              Изменить
            </button>
          ) : (
            <button type='submit' className='btn' disabled={review.trim() === '' ?? false}>
              Опубликовать
            </button>
          )}
        </div>
      </div>
      <div className='commodityPage__feedback-status hidenElem'>
        <div className='commodityPage__feedback-status-content'>
          {loading ? (
            <>
              <LoadingIndicator />
              {userReview?.review ? 'Ваш отзыв обновляется' : 'Ваш отзыв добавляется'}
            </>
          ) : (
            <>
              <div className='thanks'>
                {name}
                {userReview?.review ? ', ваш отзыв был успешно обновлен' : ', спасибо за отзыв'}
              </div>
              <button className='btn' onClick={(e) => hideFeedbackStatus(e)}>
                Перейти к редактированию
              </button>
            </>
          )}
        </div>
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
