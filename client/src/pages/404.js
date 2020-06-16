import React from 'react';
import withStore from '../utils/workWithRedux';
import { redirectToPage } from '../utils/workWithBrowser';


const Page404 = ({ history }) => {
  return (
    <>
      <h1>Ошибка, страница не найдена</h1>
      <button className='btn-success' onClick={() => redirectToPage(history, '/')}>На главную </button>
    </>
  );
};

export default withStore(Page404);
