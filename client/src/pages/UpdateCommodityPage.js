import React, { useMemo } from 'react';
import LoadingDataLogic from '../logicComponents/LoadingData';
import withStore from '../utils/workWithRedux';
import DetailForWorkWithCommodity from '../components/DetailForWorkWithCommodity';
import { findId } from '../utils/workWithBrowser';

const UpdateCommodityPage = ({ commodityData: { loading, error: noCommodity, title, shortDescr, descr, previewImg, previewImgSrc }, actions: { fetchCommodity }, userData: { token, error: invalidUser }, history }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: invalidUser ? invalidUser : noCommodity,
        funcForRender: token ? () => fetchCommodity(findId(history), token, history) : null,
      }}
    >
      <DetailForWorkWithCommodity
        data={useMemo(
          () => ({
            title,
            shortDescr,
            descr,
            previewImgSrc
          }),
          [title, descr, shortDescr, previewImgSrc]
        )}
      />
    </LoadingDataLogic>
  );
};

export default withStore(UpdateCommodityPage);
// /admin/updateCommodity/5e84c883e2286534184940de/
