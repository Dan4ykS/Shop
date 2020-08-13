import React, { useState, useEffect } from 'react';
import MoreReviews from '../../../components/MoreReviews';
import ListView from '../../../components/ListView';
import Rating from '../../../components/Rating/Rating';
import './Reviews.scss';
import { showReview, createValidImgSrc } from '../../../utils/workWithBrowser';
import { connectToStore } from '../../../utils/workWithRedux';

const Reviews = ({ userData: { reviews, userName } }) => {
  const [countReviews, switchCountReviews] = useState(3);

  useEffect(() => showReview('.accountPage__reviews-item'), [reviews]);

  if (!reviews.length) {
    return null;
  }

  return (
    <>
      <div className='blockTitle'>Отзывы</div>
      <ListView
        listForRender={reviews.slice(0, countReviews)}
        ComponentForRender={({
          data: { commodityImg, commodityTitle, reviewRating: rating, review, commodityId, reviewId },
        }) => (
          <div className='accountPage__reviews-item row'>
            <div className='accountPage__reviews-item-img flexWrapColumn_center col-2'>
              <img src={createValidImgSrc(commodityImg)} alt={`avatar-${userName}`} />
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
              <textarea className='review__text formControl' value={review ?? ''} />
              <div className='btnGroup_right'>
                <button className='btn' disabled>
                  Изменить
                </button>
              </div>
            </div>
          </div>
        )}
      />
      <MoreReviews
        className='accountPage__reviews-item-moreBtn'
        reviews={reviews}
        countReviews={countReviews}
        switchCountReviews={switchCountReviews}
      />
    </>
  );
};

export default connectToStore(['userData'], null)(Reviews);
