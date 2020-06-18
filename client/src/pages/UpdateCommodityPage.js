import React from 'react';
import LoadingDataLogic from '../logicComponents/LoadingData';
import withStore from '../utils/workWithRedux';
import ChangeCommodityDetail from '../components/ChangeCommodityDetail';
import { findPathParams } from '../utils/workWithBrowser';

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
  userData: {
    token,
    error: userError,
  },
  history,
}) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: userError ? userError : commodityError,
        funcForRender: token ? () => fetchCommodity(findPathParams(history), token, history) : null,
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
          type: 'update'
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

export default withStore(UpdateCommodityPage);
