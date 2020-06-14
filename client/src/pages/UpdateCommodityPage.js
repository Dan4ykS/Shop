import React, { useMemo } from 'react';
import LoadingDataLogic from '../logicComponents/LoadingData';
import withStore from '../utils/workWithRedux';
import ChangeCommodityDetail from '../components/ChangeCommodityDetail';
import { findPathParams } from '../utils/workWithBrowser';

const UpdateCommodityPage = ({ commodityData: { loading, error: noCommodity, title, shortDescr, descr, previewImg, img, id }, actions, userData: { token, error: invalidUser, userName }, history }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: invalidUser ? invalidUser : noCommodity,
        funcForRender: token ? () => actions.fetchCommodity(findPathParams(history), token, history) : null,
      }}
    >
      <ChangeCommodityDetail
        data={useMemo(
          () => ({
            title,
            shortDescr,
            descr,
            previewImg,
            img,
            id,
          }),
          [title, descr, shortDescr, previewImg, img, id]
        )}
        actions={actions}
      />
    </LoadingDataLogic>
  );
};

export default withStore(UpdateCommodityPage);
// /admin/updateCommodity/5e84c883e2286534184940de/
