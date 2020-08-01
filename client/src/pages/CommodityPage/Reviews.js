import React from 'react';
import ListView from '../../components/ListView';
import { createValidImgSrc } from '../../utils/workWithBrowser';
import { createTextWithBr } from '../../utils/workWithReactElements';
import Rating from '../../components/Rating/Rating';

const Reviews = ({ reviews }) => {
  if (!reviews.length) {
    return null;
  }
  return (
    <>
      <div className='commodityPage__blockTitle'>Отзывы</div>
      <ListView
        listForRender={reviews}
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
                <div>
                  <Rating userRating={reviewRating} editable={false} />
                </div>
              </div>
              <div className='review__text'>{createTextWithBr(review, 400)}</div>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default Reviews;
