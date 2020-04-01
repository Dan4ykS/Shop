import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Page404 = () => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to='/' />;
  }
  return (
    <>
      <h1>Ошибка, страница не найдена</h1>
      <button onClick={() => setRedirect(true)}>На главную </button>
    </>
  );
};

export default Page404;
