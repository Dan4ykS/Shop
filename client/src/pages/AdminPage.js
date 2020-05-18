import React, { useCallback } from 'react';
import withStore from '../utils/workWithRedux';
import { getDateFromLocalStorage } from '../utils/workWithBrowser';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { chekAdmin } from '../utils/workWithApiRequest';

const AdminPage = ({ userData: { userName, loading, error }, actions: { isLogin, loadCart, fetchGoods, invalidRoute } }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: userName === 'admin' ? null : error,
        // eslint-disable-next-line
        funcForRender: useCallback(() => chekAdmin(getDateFromLocalStorage('userData'), userName, isLogin, loadCart, fetchGoods, invalidRoute)),
      }}
    >
      <h2>Страница админа!</h2>
    </LoadingDataLogic>
  );
};

export default withStore(AdminPage);
