import React from 'react';
import { connectToStore } from '../utils/workWithRedux';
import { logOut } from '../utils/workWithBrowser';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { isLogout } from '../actions/userData';

const AccountPage = ({
  userData: { loading, error, userName },
  actions: { isLogout, isLogin, loadCart, fetchGoods },
  history,
}) => {
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

export default connectToStore(['userData'],[isLogout])(AccountPage, true);
