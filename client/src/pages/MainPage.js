import React, { useState } from 'react';
import withSore from '../utils/helpFuncsForRedux';
import Calendar from '../components/Calendar';
import UsersService from '../services/UsersService';

const MainPage = ({}) => {
  const [imagePreview, changeImagePreview] = useState('');
  const [file, changeImageFile] = useState('');
  const [textInInput, changetextInInput] = useState('');
  const reader = new FileReader();
  reader.onload = () => {
    changeImagePreview(reader.result);
  };
  return (
    <>
      <Calendar />
      <h2>Главная страница! </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData();
          // const data = {};
          // data['img'] = file;
          // data['msg'] = textInInput;
          data.append('image', file, file.name);
          data.append('msg', textInInput);
          UsersService.testData(data);
        }}
      >
        <div className='form-group'>
          <input
            type='file'
            className='form-control-file'
            id='exampleFormControlFile1'
            onChange={(e) => {
              changeImageFile(e.target.files[0]);
              reader.readAsDataURL(e.target.files[0]);
            }}
          />
          <input type='text' className='form-control-file' id='exampleFormControlFile1' onChange={(e) => changetextInInput(e.target.value)} />
        </div>
        <img src={imagePreview} alt='img' style={{ width: '100%' }} />
        <button className='btn btn-danger' type='submit'>
          Тестировать дату
        </button>
      </form>
    </>
  );
};
export default withSore(MainPage);
