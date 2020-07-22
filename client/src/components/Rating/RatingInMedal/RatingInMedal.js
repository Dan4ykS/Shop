import React from 'react';
import medalImgSrc from './medal.png';
import './RatingInMedal.scss'

const RatingInMedal = ({ rating }) => {
  if (rating) {
    return (
      <div className='ratingInMedal'>
        <img src={medalImgSrc} alt='rating' />
        <span>{rating}</span>
      </div>
    );
  } else return null;
};

export default RatingInMedal;
