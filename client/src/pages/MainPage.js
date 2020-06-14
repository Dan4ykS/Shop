import React from 'react';
import withSore from '../utils/workWithRedux';
import FileUploader from '../components/FileUploader';
import GoodsService from '../services/GoodsService';

const MainPage = ({ commodityData: { imgSrc, img }, actions: { updateImg }, userData: { token } }) => {
  return (
    <>
      {/* <Calendar /> */}
      <h2>Главная страница! </h2>
      <form
        className='row'
        onSubmit={(e) => {
          e.preventDefault();
          const extraData = {
            text1: '123',
            text2: 123,
          };
          GoodsService.testData({ withFiles: true, shortDescr: 'vrwefvreferfrefr', extraData }, token);
        }}
      >
        <div className='col-lg-6'>
          <FileUploader action={updateImg} />
        </div>
        <div className='col-lg-6'>{imgSrc ? <img src={imgSrc} alt='img' style={{ width: '100%' }} /> : null}</div>
        <button type='submit'>Отправить</button>
      </form>
    </>
  );
};
export default withSore(MainPage);
