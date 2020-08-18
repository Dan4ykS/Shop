import React, { useState } from 'react';
import Rating from '../../../components/Rating/Rating';
import { createValidImgSrc, validateInput, setDataRemove } from '../../../utils/workWithBrowser';
import { connectToStore } from '../../../utils/workWithRedux';
import { updateUserReviews } from '../../../actions/userData';
import { updateReviews } from '../utils';

const Review = ({
  data: { commodityImg, commodityTitle, reviewRating: rating, review, commodityId, reviewId },
  userData: { token, userName },
  actions: { updateBoughtGoods, updateUserReviews },
}) => {
  const [locaReviewData, updateLocalReviewData] = useState(review),
    userReview = {
      rating,
      reviewId,
      review: locaReviewData,
    },
    dataForUpdate = {
      ...userReview,
      token,
    },
    funcsForUpdate = {
      updateUserReviews,
    };

  return (
    <form
      className='accountPage__reviews-item row'
      onSubmit={(e) => updateReviews(e, dataForUpdate, funcsForUpdate)}
      data-remove={false}
    >
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
                userReview,
              }}
              funcsForUpdate={{ updateBoughtGoods }}
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
          <button type='submit' className='btn' onClick={(e) => setDataRemove(e, '.accountPage__reviews-item')}>
            Удалить
          </button>
        </div>
      </div>
    </form>
  );
};

export default connectToStore(['userData'], { updateUserReviews })(Review);
