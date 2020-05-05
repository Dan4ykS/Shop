import React, { useCallback } from 'react';
import withStore from '../utils/helpFuncsForRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { chekToken } from '../utils/helpFuncsForBrouser';

const ResetPasswordPage = ({ history, actions: { isLogin, loadCart, fetchGoods }, userData: { error } }) => {
  // console.log(history.location.pathname.split('=')[1])
  const userToken = { token: history.location.pathname.split('=')[1] };
  const configData = {
    loading: false,
    error,
    loadingData: useCallback(() => chekToken(userToken, isLogin, loadCart, fetchGoods), []),
  };
  return (
    <LoadingDataLogic configData={configData}>
      <h2>Компонент работает !</h2>
    </LoadingDataLogic>
  );
};

export default withStore(ResetPasswordPage);
