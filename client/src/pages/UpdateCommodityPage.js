import React, { useMemo } from 'react';
import LoadingDataLogic from '../logicComponents/LoadingData';
import withStore from '../utils/workWithRedux';
import ChangeCommodityDetail from '../components/ChangeCommodityDetail';
import { findId } from '../utils/workWithBrowser';

const UpdateCommodityPage = ({ commodityData: { loading, error: noCommodity, title, shortDescr, descr, previewImg, previewImgSrc, img, imgSrc, id }, actions, userData: { token, error: invalidUser }, history }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: invalidUser ? invalidUser : noCommodity,
        funcForRender: token ? () => actions.fetchCommodity(findId(history), token, history) : null,
      }}
    >
      <ChangeCommodityDetail
        data={useMemo(
          () => ({
            title,
            shortDescr,
            descr,
            previewImgSrc,
            imgSrc,
            id,
          }),
          [title, descr, shortDescr, previewImgSrc, id]
        )}
        actions={actions}
      />
    </LoadingDataLogic>
  );
};

export default withStore(UpdateCommodityPage);
// /admin/updateCommodity/5e84c883e2286534184940de/
