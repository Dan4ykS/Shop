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
      {/* <button
        className='btn-warning'
        onClick={() => {
          fetch('/api/createBooks', {
            headers: {
              Authentication: `token ${token}`,
            },
          })
            .then((resp) => resp.json())
            .then((data) => console.log(data));
        }}
      >
        Создать книги
      </button> */}
    </>
  );
};
export default withSore(MainPage);
