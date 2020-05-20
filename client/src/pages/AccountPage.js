import React, { useCallback } from 'react';
import withStore from '../utils/workWithRedux';
import { getDateFromLocalStorage, logOut } from '../utils/workWithBrowser';
import { chekUser } from '../utils/workWithApiRequest';
import LoadingDataLogic from '../logicComponents/LoadingData';

const AccountPage = ({ userData: { loading, error, userName }, actions: { isLogout, isLogin, loadCart, fetchGoods }, history }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: userName !== null ? null : error,
        funcForRender: () => console.log('Я вызвалась!'),
      }}
    >
      <h2>Здесь будет личный кабинет</h2>
      <button onClick={() => logOut(isLogout, history)}>Выход</button>
    </LoadingDataLogic>
  );
};

export default withStore(AccountPage);
// () => chekUser(getDateFromLocalStorage('userData'), isLogin, loadCart, fetchGoods, userName);
