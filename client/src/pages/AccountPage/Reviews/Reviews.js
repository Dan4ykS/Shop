import React, { useState, useEffect } from 'react';
import MoreReviews from '../../../components/MoreReviews';
import ListView from '../../../components/ListView';
import Rating from '../../../components/Rating/Rating';
import Review from './Review';
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
        ComponentForRender={Review}
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
