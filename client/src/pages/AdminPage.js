import React from 'react';
import withStore from '../utils/workWithRedux';
import { getDateFromLocalStorage } from '../utils/workWithBrowser';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { chekAdmin } from '../utils/workWithApiRequest';

const AdminPage = ({ userData: { userName, loading, error }, actions: { isLogin, userLogin, invalidRoute }, history }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: userName === 'admin' ? null : error,
        funcForRender: () => chekAdmin(getDateFromLocalStorage('userData'), userName, isLogin, userLogin, invalidRoute, history),
      }}
    >
      <h2>Страница админа!</h2>
    </LoadingDataLogic>
  );
};

export default withStore(AdminPage);
//  <LoadingDataLogic
//    configData={{
//      loading,
//      error: userName === 'admin' ? null : error,
//      // eslint-disable-next-line
//      funcForRender: useCallback(() => chekAdmin(getDateFromLocalStorage('userData'), userName, isLogin, userLogin, invalidRoute)),
//    }}
//  >
//    <h2>Страница админа!</h2>
//  </LoadingDataLogic>;
