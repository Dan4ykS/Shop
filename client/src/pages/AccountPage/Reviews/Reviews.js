import React, { useState } from 'react';
import MoreReviews from '../../../components/MoreReviews';
import ListView from '../../../components/ListView';
import Review from './Review';
import './Reviews.scss';
import { connectToStore } from '../../../utils/workWithRedux';

const Reviews = ({ userData: { reviews } }) => {
  const [countReviews, switchCountReviews] = useState(3);

  if (!reviews.length) {
    return null;
  }

  return (
    <>
      <div className='blockTitle'>Отзывы</div>
      <ListView listForRender={reviews.slice(0, countReviews)} ComponentForRender={Review} />
      <MoreReviews
        className='accountPage__reviews-item-moreBtn'
        reviews={reviews}
        countReviews={countReviews}
        switchCountReviews={switchCountReviews}
      />
    </>
  );
};

export default connectToStore(['userData.reviews'], null)(Reviews);
