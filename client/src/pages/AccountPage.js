import React from 'react';
import withStore from '../utils/helpFuncsForRedux';
import { Redirect } from 'react-router-dom';

const AccountPage = ({ userData: { token }, actions: { isLogout } }) => {
  if (!token) {
    return <Redirect to='/' />;
  }
  return (
    <>
      <h2>Здесь будет личный кабинет</h2>
      <button onClick={() => isLogout()}>Выход</button>
    </>
  );
};

export default withStore(AccountPage);
