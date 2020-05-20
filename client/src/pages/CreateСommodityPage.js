import React from 'react';
import LoadingDataLogic from '../logicComponents/LoadingData';
import withStore from '../utils/workWithRedux';
import DetailForWorkWithCommodity from '../components/DetailForWorkWithCommodity';

const CreateСommodityPage = ({ commodityData: { }, userData: {loading, error } }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
      }}
    >
      <DetailForWorkWithCommodity />
    </LoadingDataLogic>
  );
};

export default withStore(CreateСommodityPage);
