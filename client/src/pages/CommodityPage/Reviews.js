import React, { useState, useEffect } from 'react';
import ListView from '../../components/ListView';
import Rating from '../../components/Rating/Rating';
import TextWithBr from '../../components/TextWithBr/TextWithBr';
import MoreReviews from '../../components/MoreReviews';
import { createValidImgSrc, showReview } from '../../utils/workWithBrowser';

const Reviews = ({ reviews }) => {
  const [countReviews, switchCountReviews] = useState(5);

  useEffect(() => showReview('.commodityPage__reviews-item'), [reviews]);

  if (!reviews.length) {
    return null;
  }

  return (
    <>
      <div className='blockTitle'>Отзывы</div>
      <ListView
        listForRender={reviews.slice(0, countReviews)}
        ComponentForRender={({ data: { reviewerName, reviewerAvatar, reviewDate, review, reviewRating } }) => (
          <div className='commodityPage__reviews-item row'>
            <div className='commodityPage__reviews-item-img col-lg-1 col-2'>
              <div className='userAvatar'>
                <img src={createValidImgSrc(reviewerAvatar)} alt={`avatar-${reviewerName}`} />
              </div>
            </div>
            <div className='commodityPage__reviews-item-content col-lg-11 col-10'>
              <div className='review__header flexWrap_SB'>
                <div className='flexWrap'>
                  <span>{reviewerName}</span>
                  {window.screen.width > 575 ? <span>{reviewDate}</span> : null}
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
