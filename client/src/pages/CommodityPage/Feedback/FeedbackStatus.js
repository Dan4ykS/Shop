import React from 'react';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { hideFeedbackStatus } from '../utils';
import { connectToStore } from '../../../utils/workWithRedux';

const StatusContent = ({  fullName , userReview }) => {
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

const FeedbackStatus = ({ commodityData: { userReview }, userData: { fullName }, loading, oldReview }) => {
  const loadingReview = loading ? <LoadingIndicator /> : null;
  const content = !loading ? <StatusContent userReview={userReview} fullName={fullName} oldReview={oldReview} /> : null;
  return (
    <div className='commodityPage__feedback-status-content'>
      {loadingReview}
      {content}
    </div>
  );
};

export default connectToStore(['userData.fullName', 'commodityData.userReview'], null)(FeedbackStatus);
