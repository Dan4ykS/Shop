import React from 'react';
import withStore from '../utils/helpFuncsForRedux';
import { redirectToPage } from '../utils/helpFuncsForBrouser';


const Page404 = ({ history }) => {
  console.log(history.location.pathname.split('=')[1]);
  return (
    <>
      <h1>Ошибка, страница не найдена</h1>
      <button className='btn btn-success' onClick={() => redirectToPage(history, '/')}>На главную </button>
    </>
  );
};

export default withStore(Page404);
