import React from 'react';
import withSore from '../utils/helpFuncsForRedux';

const MainPage = ({}) => {
  return (
    <>
      <h2>Главная страница! </h2>
      <form>
        <div className='form-group'>
          <input type='file' className='form-control-file' id='exampleFormControlFile1' onChange={(e) => console.log(e.target.value)} />
        </div>
      </form>
    </>
  );
};
export default withSore(MainPage);
