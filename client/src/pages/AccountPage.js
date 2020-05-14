import React, { useCallback } from 'react';
import withStore from '../utils/helpFuncsForRedux';
import { getDateFromLocalStorage, logOut } from '../utils/workWithBrowser';
import { chekUser } from '../utils/workWithApiRequest';
import LoadingDataLogic from '../logicComponents/LoadingData';

const AccountPage = ({ userData: { loading, error, userName }, actions: { isLogout, isLogin, loadCart, fetchGoods, blockDuplicateRequests }, history }) => {
  console.log(error);
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: userName !== null ? null : error,
        // eslint-disable-next-line
        funcForRender: useCallback(() => chekUser(getDateFromLocalStorage('userData'), isLogin, loadCart, fetchGoods, userName), []),
      }}
    >
      <h2>Здесь будет личный кабинет</h2>
      <button onClick={() => logOut(isLogout, history)}>Выход</button>
    </LoadingDataLogic>
  );
};

export default withStore(AccountPage);
// () => chekUser(getDateFromLocalStorage('userData'), isLogin, loadCart, fetchGoods, userName);
