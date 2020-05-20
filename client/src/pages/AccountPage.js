import React from 'react';
import withStore from '../utils/workWithRedux';
import {logOut } from '../utils/workWithBrowser';
import LoadingDataLogic from '../logicComponents/LoadingData';

const AccountPage = ({ userData: { loading, error, userName }, actions: { isLogout, isLogin, loadCart, fetchGoods }, history }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: userName !== null ? null : error,
      }}
    >
      <h2>Здесь будет личный кабинет</h2>
      <button onClick={() => logOut(isLogout, history)}>Выход</button>
    </LoadingDataLogic>
  );
};

export default withStore(AccountPage);
