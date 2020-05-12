import React from 'react';
import withSore from '../utils/helpFuncsForRedux';
import Calendar from '../components/Calendar';
import FileUploader from '../components/FileUploader';

const MainPage = ({ commodityData: { imgSrc } }) => {
  return (
    <>
      <Calendar />
      <h2>Главная страница! </h2>
      <form
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   const data = new FormData();
      //   // const data = {};
      //   // data['img'] = file;
      //   // data['msg'] = textInInput;
      //   data.append('image', file, file.name);
      //   data.append('msg', textInInput);
      //   UsersService.testData(data);
      // }}
      >
        <div className='form-group'>
          <FileUploader />
        </div>
        <img src={imgSrc} alt='img' style={{ width: '100%' }} />
        <button className='btn btn-danger' type='submit'>
          Тестировать дату
        </button>
      </form>
    </>
  );
};
export default withSore(MainPage);
