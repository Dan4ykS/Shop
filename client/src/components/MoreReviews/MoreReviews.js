import React from 'react';
import { calcRemainingReviewsCount } from './utils';

const MoreReviews = ({ reviews, countReviews, switchCountReviews, className = null }) => {
  return (
    <>
      {reviews.length > countReviews ? (
        <button
          className={`btn btn-dark btn_center ${className ?? ''}`}
          onClick={() => switchCountReviews((count) => (count += calcRemainingReviewsCount(countReviews, reviews.length)))}
        >
          Показать еще {calcRemainingReviewsCount(countReviews, reviews.length)}
        </button>
      ) : null}
    </>
  );
};

export default MoreReviews;
