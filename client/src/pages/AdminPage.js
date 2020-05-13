import React from 'react';
import withStore from '../utils/helpFuncsForRedux';
import { redirectToPage } from '../utils/helpFuncsForBrouser';

const AdminPage = ({ userData: { userName }, history }) => {
  if (userName !== 'admin') {
    redirectToPage(history, '/Login/')
  }
  return (
    <>
      <h2>Страница админа!</h2>
    </>
  );
};

export default withStore(AdminPage);
