import React from 'react';
import { useHistory } from 'react-router-dom';
import { redirectToURL } from '../utils/helpFuncsForBrouser';

const Page404 = () => {
  const hisory = useHistory();
  return (
    <>
      <h1>Ошибка, страница не найдена</h1>
      <button onClick={() => redirectToURL(hisory, '/')}>На главную </button>
    </>
  );
};

export default Page404;
