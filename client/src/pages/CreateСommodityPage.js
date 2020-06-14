import React from 'react';
import LoadingDataLogic from '../logicComponents/LoadingData';
import withStore from '../utils/workWithRedux';
import ChangeCommodityDetail from '../components/ChangeCommodityDetail';

const CreateСommodityPage = ({ userData: { loading, error }, actions }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
      }}
    >
      <ChangeCommodityDetail actions={actions}/>
    </LoadingDataLogic>
  );
};

export default withStore(CreateСommodityPage);
