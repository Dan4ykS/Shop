import React, { useState, useEffect } from 'react';
import './Rating.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { updateCommodityRating, clearTotalRating, checkTotalRating } from './utils';

const Rating = ({
  userRating = 0,
  updateUserReview = null,
  userToken = null,
  reviewId = null,
  commodityId = null,
  updateRating = null,
  editable = true,
}) => {
  const [localUserRating, changeLocalUserRating] = useState(userRating);

  useEffect(() => {
    changeLocalUserRating(userRating);
  }, [userRating]);

  const dataForUpdateRating = { userToken, reviewId, commodityId, editable, localUserRating },
    funcsForUpdateRating = { updateUserReview, changeLocalUserRating, updateRating };

  return (
    <div
      className='rating flexWrap'
      data-totalvalue={userRating}
      onMouseLeave={(e) => checkTotalRating(e, localUserRating, editable)}
    >
      <div
        className={editable ? 'rating__item' : 'rating__item_noEditable'}
        data-value={5}
        onClick={(e) => updateCommodityRating(e, dataForUpdateRating, funcsForUpdateRating)}
      >
        <FontAwesomeIcon icon={faStar} onMouseEnter={(e) => clearTotalRating(e, editable)} />
      </div>
      <div
        className={editable ? 'rating__item' : 'rating__item_noEditable'}
        data-value={4}
        onClick={(e) => updateCommodityRating(e, dataForUpdateRating, funcsForUpdateRating)}
      >
        <FontAwesomeIcon icon={faStar} onMouseEnter={(e) => clearTotalRating(e, editable)} />
      </div>
      <div
        className={editable ? 'rating__item' : 'rating__item_noEditable'}
        data-value={3}
        onClick={(e) => updateCommodityRating(e, dataForUpdateRating, funcsForUpdateRating)}
      >
        <FontAwesomeIcon icon={faStar} onMouseEnter={(e) => clearTotalRating(e, editable)} />
      </div>
      <div
        className={editable ? 'rating__item' : 'rating__item_noEditable'}
        data-value={2}
        onClick={(e) => updateCommodityRating(e, dataForUpdateRating, funcsForUpdateRating)}
      >
        <FontAwesomeIcon icon={faStar} onMouseEnter={(e) => clearTotalRating(e, editable)} />
      </div>
      <div
        className={editable ? 'rating__item' : 'rating__item_noEditable'}
        data-value={1}
        onClick={(e) => updateCommodityRating(e, dataForUpdateRating, funcsForUpdateRating)}
      >
        <FontAwesomeIcon icon={faStar} onMouseEnter={(e) => clearTotalRating(e, editable)} />
      </div>
    </div>
  );
};

export default Rating;
