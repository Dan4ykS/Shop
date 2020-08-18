import React from 'react';
import { connectToStore } from '../../../utils/workWithRedux';
import { setDataRemove } from '../../../utils/workWithBrowser';

const FeedbackBtn = ({ commodityData: { userReview }, newReview }) => {
  return (
    <>
      {userReview?.review ? (
        <div className='btnGroup_center'>
          <button type='submit' className='btn' disabled={userReview.review.trim() === newReview.trim() ?? false}>
            Изменить
          </button>
          <button type='submit' className='btn' onClick={(e) => setDataRemove(e, '.commodityPage__feedback')}>
            Удалить
          </button>
        </div>
      ) : (
        <button type='submit' className='btn btn_center' disabled={newReview?.trim() === '' ?? false}>
          Опубликовать
        </button>
      )}
    </>
  );
};

export default connectToStore(['commodityData.userReview'], null)(FeedbackBtn);
