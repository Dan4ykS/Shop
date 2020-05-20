import React from 'react';
import withSore from '../utils/workWithRedux';
import Calendar from '../components/Calendar';
import FileUploader from '../components/FileUploader';

const MainPage = ({ commodityData: { imgSrc }, actions: { updateImg } }) => {
  return (
    <>
      {/* <Calendar /> */}
      <h2>Главная страница! </h2>
      <form className='row'>
        <div className='col-lg-6'>
          <FileUploader action={updateImg} />
        </div>
        <div className='col-lg-6'>{imgSrc ? <img src={imgSrc} alt='img' style={{ width: '100%' }} /> : null}</div>
      </form>
    </>
  );
};
export default withSore(MainPage);
