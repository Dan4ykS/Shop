import React from 'react';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { hideFeedbackStatus } from '../utils';
import { connectToStore } from '../../../utils/workWithRedux';

const StatusContent = ({ userReview, name, oldReview }) => {
  let message = ', ',
    btnText = 'Перейти к редактированию';

  if (userReview?.reviewWasRemoved) {
    message += 'ваш отзыв был успешно удален';
    btnText = 'Напиисать новый отзыв';
  } else if (oldReview) {
    message += 'ваш отзыв был успешно обновлен';
  } else {
    message += 'спасибо за отзыв';
  }
  return (
    <>
      <div className='thanks'>
        {name}
        {message}
      </div>
      <button className='btn' onClick={(e) => hideFeedbackStatus(e)}>
        {btnText}
      </button>
    </>
  );
};

const FeedbackStatus = ({ commodityData: { userReview }, userData: { name }, loading, oldReview }) => {
  const loadingReview = loading ? <LoadingIndicator /> : null;
  const content = !loading ? <StatusContent userReview={userReview} name={name} oldReview={oldReview} /> : null;
  return (
    <div className='commodityPage__feedback-status-content'>
      {loadingReview}
      {content}
    </div>
  );
};

export default connectToStore(['userData.name', 'commodityData.userReview'], null)(FeedbackStatus);
