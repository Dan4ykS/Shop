import React from 'react';
import { redirectToPage } from '../utils/workWithBrowser';
import { withRouter } from 'react-router';


const Page404 = ({ history }) => {
  return (
    <>
      <h1>Ошибка, страница не найдена</h1>
      <button className='btn-success' onClick={() => redirectToPage(history, '/')}>На главную </button>
    </>
  );
};

export default withRouter(Page404);
