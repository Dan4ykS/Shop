import React from 'react';
import LoadingDataLogic from '../logicComponents/LoadingData';
import withStore from '../utils/workWithRedux';
import ChangeCommodityDetail from '../components/ChangeCommodityDetail';

const CreateСommodityPage = ({ userData: { loading, error } }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
      }}
    >
      <ChangeCommodityDetail />
    </LoadingDataLogic>
  );
};

export default withStore(CreateСommodityPage);
