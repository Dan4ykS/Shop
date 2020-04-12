import React from 'react';
import withSore from '../utils/helpFuncsForRedux';

const MainPage = ({ userData: { token } }) => {
  return (
    <>
      <h2>Главная страница! </h2>
      <button
        className='btn-warning'
        onClick={() => {
          fetch('/api/getUsers', {
            headers: {
              Authentication: `token ${token}`,
            },
          })
            .then((resp) => resp.json())
            .then((data) => console.log(data));
        }}
      >
        Получить данные
      </button>
      <form>
        <div className='form-group'>
          <input type='file' className='form-control-file' id='exampleFormControlFile1' onChange={(e) => console.log(e.target.value)}/>
        </div>
      </form>
    </>
  );
};
export default withSore(MainPage);
