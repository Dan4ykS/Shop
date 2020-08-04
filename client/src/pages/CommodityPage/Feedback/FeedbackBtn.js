import React from 'react';
import { connectToStore } from '../../../utils/workWithRedux';
import { setDataRemove } from '../utils';

const FeedbackBtn = ({ commodityData: { userReview }, newReview }) => {
  return (
    <>
      {userReview?.review ? (
        <div className='flexWrap_center'>
          <button type='submit' className='btn' disabled={userReview.review.trim() === newReview.trim() ?? false}>
            Изменить
          </button>
          <button type='submit' className='btn' onClick={(e) => setDataRemove(e)}>
            Удалить
          </button>
        </div>
      ) : (
        <button type='submit' className='btn' disabled={newReview?.trim() === '' ?? false}>
          Опубликовать
        </button>
      )}
    </>
  );
};

export default connectToStore(['commodityData.userReview'], null)(FeedbackBtn);
