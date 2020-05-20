import React from 'react';
import withStore from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';

const AdminPage = ({ userData: { userName, loading, error }, actions: { isLogin, userLogin, invalidRoute }, history }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
      }}
    >
      <h2>Страница админа!</h2>
    </LoadingDataLogic>
  );
};

export default withStore(AdminPage);

