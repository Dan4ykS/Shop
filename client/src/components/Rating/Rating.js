import React from 'react';
import './Rating.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { updateCommodityRating } from './utils';
import { findNeedElement, findNeedElements } from '../../utils/workWithBrowser';

const Rating = ({ userRating = 0 }) => {
  return (
    <div className='rating flexWrap' data-totalvalue={userRating}>
      <div
        className='rating__item'
        data-value={5}
        onClick={(e) => updateCommodityRating(e)}
        // onMouseEnter={(e) => {
        //   const ratingItems = e.target.closest('.rating').children;
        //   ratingItems.forEach((item) => {
        //     if (item.dataset.value < e.target.dataset.value) {
        //       item.classList.style.backgroundColor = 'red';
        //     }
        //   });
        // }}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
      <div
        className='rating__item'
        data-value={4}
        onClick={(e) => updateCommodityRating(e)}
        // onMouseEnter={(e) => {
        //   const ratingItems = e.target.closest('.rating').children;
        //   ratingItems.forEach((item) => {
        //     if (item.dataset.value < e.target.dataset.value) {
        //       item.classList.style.backgroundColor = 'red';
        //     }
        //   });
        // }}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
      <div
        className='rating__item'
        data-value={3}
        onClick={(e) => updateCommodityRating(e)}
        // onMouseEnter={(e) => {
        //   const ratingItems = e.target.closest('.rating').children;
        //   ratingItems.forEach((item) => {
        //     if (item.dataset.value < e.target.dataset.value) {
        //       item.classList.style.backgroundColor = 'red';
        //     }
        //   });
        // }}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
      <div
        className='rating__item'
        data-value={2}
        onClick={(e) => updateCommodityRating(e)}
        // onMouseEnter={(e) => {
        //   const ratingItems = e.target.closest('.rating').children;
        //   ratingItems.forEach((item) => {
        //     if (item.dataset.value < e.target.dataset.value) {
        //       item.classList.style.backgroundColor = 'red';
        //     }
        //   });
        // }}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
      <div
        className='rating__item'
        data-value={1}
        onClick={(e) => updateCommodityRating(e)}
        // onMouseEnter={(e) => {
        //   const ratingItems = e.target.closest('.rating').children;
        //   ratingItems.forEach((item) => {
        //     if (item.dataset.value < e.target.dataset.value) {
        //       item.classList.style.backgroundColor = 'red';
        //     }
        //   });
        // }}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
    </div>
  );
};

export default Rating;
