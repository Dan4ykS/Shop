import React from 'react';
import LoadingIndicator from '../LoadingIndicator';
import { connectToStore } from '../../utils/workWithRedux';
import { hideFeedbackStatus } from './utils';

const StatusContent = ({ fullName, userReview }) => {
  let message = ', ',
    btnText = 'Перейти к редактированию';

  if (userReview?.reviewWasRemoved) {
    message += 'ваш отзыв был успешно удален';
    btnText = 'Напиисать новый отзыв';
  } else if (userReview?.reviewWasUpdate) {
    message += 'ваш отзыв был успешно обновлен';
  } else {
    message += 'спасибо за отзыв';
  }
  return (
    <>
      <div className='thanks'>
        {fullName}
        {message}
      </div>
      <button className='btn' onClick={(e) => hideFeedbackStatus(e)}>
        {btnText}
      </button>
    </>
  );
};

const ReviewStatus = ({ commodityData: { userReview }, userData: { fullName }, loading, oldReview, selectorFo }) => {
  const loadingReview = loading ? <LoadingIndicator /> : null;
  const content = !loading ? <StatusContent userReview={userReview} fullName={fullName} oldReview={oldReview} /> : null;
  return (
    <div className='commodityPage__feedback-status-content'>
      {loadingReview}
      {content}
    </div>
  );
};

export default connectToStore(['userData.fullName', 'commodityData.userReview'], null)(ReviewStatus);
