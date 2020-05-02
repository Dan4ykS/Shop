import React from 'react';
import withStore from '../utils/helpFuncsForRedux';
import { redirectToPage } from '../utils/helpFuncsForBrouser';

const AccountPage = ({ userData: { token }, actions: { isLogout }, history }) => {
  if (!token) {
    redirectToPage(history, '/')
  }
  return (
    <>
      <h2>Здесь будет личный кабинет</h2>
      <button onClick={() => isLogout()}>Выход</button>
    </>
  );
};

export default withStore(AccountPage);
