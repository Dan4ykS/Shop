import React from 'react';
import LoadingData from '../../components/LoadingData';
import ChangeCommodityDetail from '../../components/ChangeCommodityDetail';
import { findPathParams } from '../../utils/workWithBrowser';
import { connectToStore } from '../../utils/workWithRedux';
import {
  fetchCommodity,
  updateDescr,
  updateImg,
  updatePreviewImg,
  updatePrice,
  updateShortDescr,
  updateTitle,
} from '../../actions/commodityData';

const UpdateCommodityPage = ({ commodityData, actions, userData: { token, error: userError }, history }) => {
  return (
    <LoadingData
      configData={{
        loading: commodityData.loading,
        error: userError ? userError : commodityData.error,
        funcForRender: token ? () => actions.fetchCommodity(findPathParams(history)) : null,
        routeForRedirect: commodityData.error ? `/admin/updateCommodity?id=${findPathParams(history)}` : '/Login/',
      }}
    >
      <ChangeCommodityDetail
        data={{
          ...commodityData,
          history,
          token,
        }}
        actions={actions}
        type='update'
      />
    </LoadingData>
  );
};

export default connectToStore(
  ['userData', 'commodityData'],
  { fetchCommodity, updateDescr, updateImg, updatePreviewImg, updatePrice, updateShortDescr, updateTitle }
)(UpdateCommodityPage, true);
