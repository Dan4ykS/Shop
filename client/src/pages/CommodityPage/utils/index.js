import React from 'react';
import StringHelper from '../../../utils/StringHelper';
import { findNeedElement, scrollToElem } from '../../../utils/workWithBrowser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const toggleMoreRatingInfo = (e, toggleType) => {
  const moreRatingInfo = e.target.closest('.item__feedback').lastChild;
  if (toggleType === 'hide') {
    moreRatingInfo.classList.remove('item__feedback-moreRatingInfo_active');
    setTimeout(() => moreRatingInfo.classList.add('hiddenElem'), 30);
    return;
  }
  moreRatingInfo.classList.remove('hiddenElem');
  setTimeout(() => moreRatingInfo.classList.add('item__feedback-moreRatingInfo_active'), 30);
};

export const hideMoreRatingInfo = (e = null) => {
  if (e) {
    const parent = e.target.closest('.item__feedback-moreRatingInfo');

    parent.classList.remove('item__feedback-moreRatingInfo_active');
    setTimeout(() => parent.classList.add('hiddenElem'), 30);
  }
  const moreRatingInfo = findNeedElement('.item__feedback-moreRatingInfo');
  moreRatingInfo.classList.remove('item__feedback-moreRatingInfo_active');
  setTimeout(() => moreRatingInfo.classList.add('hiddenElem'), 30);
};

export const renderStars = (countStart) => {
  const starsArr = [];
  for (let i = 0; i < countStart; i++) {
    starsArr.push(<FontAwesomeIcon icon={faStar} key={StringHelper.createId()} />);
  }
  return starsArr;
};

export const calculateNumberOfRating = ({ oneStar = 0, twoStars = 0, threeStars = 0, fourStars = 0, fiveStars = 0 }) =>
  oneStar + twoStars + threeStars + fourStars + fiveStars;

export const calculateRatingPercentage = (rating, number) => {
  const { oneStar, twoStars, threeStars, fourStars, fiveStars } = rating,
    calcRating = calculateNumberOfRating(rating),
    allStars = calcRating > 0 ? calcRating : 100;

  const defaultAction = (typeStar) => (typeStar * 100) / allStars;

  switch (number) {
    case 5:
      return defaultAction(fiveStars);
    case 4:
      return defaultAction(fourStars);
    case 3:
      return defaultAction(threeStars);
    case 2:
      return defaultAction(twoStars);
    case 1:
      return defaultAction(oneStar);
    default:
      return 0;
  }
};

export const writeReview = (userName) => {
  if (!userName) {
    alert('Необходимо зарегистрироваться');
  } else {
    scrollToElem('commodityPage__feedback');
  }
};

export const initPage = async (commodityId, fetchCommodity, fetchSimilarGoods) => {
  await fetchCommodity(commodityId);
  await fetchSimilarGoods(commodityId);
};


