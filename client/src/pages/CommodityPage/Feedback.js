import React, { useEffect, useState } from 'react';
import Rating from '../../components/Rating/Rating';
import { connectToStore } from '../../utils/workWithRedux';
import { findUserReview, updateUserReview, updateReviews, updateRating } from '../../actions/commodityData';
import { validateInput } from '../../utils/workWithBrowser';
import { workWithReview } from '../../utils/workWithApiRequests';

const Feedback = ({
  userData: { userName, token },
  commodityData: { userReview, reviews, id },
  actions: { findUserReview, updateUserReview, updateReviews, updateRating },
}) => {
  const [review, updateLocalReview] = useState(userReview ? userReview.review : '');

  useEffect(() => {
    findUserReview(userName, reviews);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateLocalReview(userReview?.review);
  }, [userReview, updateLocalReview]);

  if (!userName) {
    return null;
  }

  return (
    <form
      className='commodityPage__feedback row'
      onSubmit={(e) => workWithReview(e, review, updateReviews, updateUserReview, token, userReview?.reviewId)}
    >
      <div className='commodityPage__feedback-title commodityPage__blockTitle col-12'>Оставить отзыв</div>
      <div className='col-2'>
        <div className='userAvatar'>
          <img src={'/static/defaultAvatar.png'} alt={`avatar-${userName}`} />
        </div>
      </div>
      <div className='col-10'>
        <div className='commodityPage__feedback-content'>
          <div className='commodityPage__feedback-content-header flexWrap_SB'>
            <div className='userName'>{userName}</div>
            <div className='userRating flexWrap'>
              <span>Оцените книгу: </span>
              <Rating
                userRating={userReview?.rating || 0}
                updateUserReview={updateUserReview}
                updateRating={updateRating}
                userToken={token}
                reviewId={userReview?.reviewId}
                commodityId={id}
              />
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
        {userReview ? (
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
  updateRating,
})(Feedback);
