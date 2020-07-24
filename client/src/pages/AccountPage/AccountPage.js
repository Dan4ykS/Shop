import React from 'react';
import LoadingData from '../../components/LoadingData';
import { connectToStore } from '../../utils/workWithRedux';
import { logOut } from '../../utils/workWithBrowser';
import { isLogout } from '../../actions/userData';

const AccountPage = ({
  userData: { loading, error, userName },
  actions: { isLogout, isLogin, loadCart, fetchGoods },
  history,
}) => {
  return (
    <LoadingData
      configData={{
        loading,
        error: userName !== null ? null : error,
      }}
    >
      <h2>Здесь будет личный кабинет</h2>
      <button onClick={() => logOut(isLogout, history)}>Выход</button>
    </LoadingData>
  );
};

export default connectToStore(['userData'], { isLogout })(AccountPage, true);
