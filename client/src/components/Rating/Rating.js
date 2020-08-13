import React, { useState, useEffect } from 'react';
import './Rating.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { updateCommodityRating, clearTotalRating, checkTotalRating } from './utils';
import { connectToStore } from '../../utils/workWithRedux';
import { updateReviews, updateUserReview, updateRating } from '../../actions/commodityData';

const Rating = ({
  userRating,
  editable = true,
  commodityData = {},
  userData: { token, fullName, avatar, userName },
  actions: { updateReviews, updateUserReview, updateRating },
}) => {
  const { id: commodityId, userReview } = commodityData,
    [localUserRating, changeLocalUserRating] = useState(userRating);

  useEffect(() => {
    changeLocalUserRating(userRating);
  }, [userRating]);

  const dataForUpdateRating = {
      token,
      reviewId: userReview?.reviewId,
      commodityId,
      editable,
      localUserRating,
      userReview,
      fullName,
      userName,
      avatar,
    },
    funcsForUpdateRating = { updateUserReview, changeLocalUserRating, updateRating, updateReviews };

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

export default connectToStore(['userData'], {
  updateReviews,
  updateUserReview,
  updateRating,
})(Rating);
