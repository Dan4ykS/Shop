import React from 'react';
import LoadingDataLogic from '../logicComponents/LoadingData';
import ChangeCommodityDetail from '../components/ChangeCommodityDetail';
import { findPathParams } from '../utils/workWithBrowser';
import { connectToStore } from '../utils/workWithRedux';

const UpdateCommodityPage = ({
  commodityData: {
    loading,
    error: commodityError,
    title,
    shortDescr,
    descr,
    previewImg,
    img,
    id,
    updatedFields,
    price,
  },
  actions: {
    updateCommodityImg,
    updateCommodityPreviewImg,
    fetchCommodity,
    updateCommodityTitle,
    updateCommodityPrice,
    updateCommodityDescr,
    updateCommodityShortDescr,
  },
  userData: { token, error: userError },
  history,
}) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: userError ? userError : commodityError,
        funcForRender: token ? () => fetchCommodity(findPathParams(history)) : null,
        routeForRedirect: commodityError ? `/admin/updateCommodity?id=${findPathParams(history)}` : '/Login/',
      }}
    >
      <ChangeCommodityDetail
        data={{
          title,
          shortDescr,
          descr,
          previewImg,
          img,
          id,
          price,
          token,
          updatedFields,
          type: 'update',
        }}
        actions={{
          updateCommodityImg,
          updateCommodityPreviewImg,
          updateCommodityTitle,
          updateCommodityDescr,
          updateCommodityShortDescr,
          updateCommodityPrice,
        }}
        history={history}
      />
    </LoadingDataLogic>
  );
};

export default connectToStore(['commodityData', 'userData'], null)(UpdateCommodityPage, true);
