import React, { useState, useEffect } from 'react';
import ListView from '../../components/ListView';
import Rating from '../../components/Rating/Rating';
import TextWithBr from '../../components/TextWithBr/TextWithBr';
import { createValidImgSrc } from '../../utils/workWithBrowser';
import { showReview } from './utils';
import MoreReviews from '../../components/MoreReviews';

const Reviews = ({ reviews }) => {
  const [countReviews, switchCountReviews] = useState(5);

  useEffect(() => showReview(), [reviews]);

  if (!reviews.length) {
    return null;
  }

  return (
    <>
      <div className='commodityPage__blockTitle'>Отзывы</div>
      <ListView
        listForRender={reviews.slice(0, countReviews)}
        ComponentForRender={({ data: { reviewerName, reviewerAvatar, reviewDate, review, reviewRating } }) => (
          <div className='commodityPage__reviews-item row'>
            <div className='commodityPage__reviews-item-img col-1'>
              <div className='userAvatar'>
                <img src={createValidImgSrc(reviewerAvatar)} alt={`avatar-${reviewerName}`} />
              </div>
            </div>
            <div className='commodityPage__reviews-item-content col-11'>
              <div className='review__header flexWrap_SB'>
                <div className='flexWrap'>
                  <span>{reviewerName}</span>
                  <span>{reviewDate}</span>
                </div>
                <div>{reviewRating ? <Rating userRating={reviewRating} editable={false} /> : null}</div>
              </div>
              <div className='review__text'>
                <TextWithBr text={review} maxlength={400} needReadMore={true} />
              </div>
            </div>
          </div>
        )}
      />
      <MoreReviews reviews={reviews} countReviews={countReviews} switchCountReviews={switchCountReviews} />
    </>
  );
};

export default Reviews;
