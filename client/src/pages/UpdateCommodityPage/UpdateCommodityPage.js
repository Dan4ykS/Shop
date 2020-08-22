import React from 'react';
import LoadingData from '../../components/LoadingData';
import ChangeCommodityDetail from '../../components/ChangeCommodityDetail';
import { findPathParams, STORE_NAME } from '../../utils/workWithBrowser';
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
import { ReactTitle } from 'react-meta-tags';

const UpdateCommodityPage = ({ commodityData, actions, userData: { token, error: userError }, history }) => {
  return (
    <div>
      <ReactTitle title={`${STORE_NAME} | Обновление данных о книге "${commodityData.title}"`} />
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
    </div>
  );
};

export default connectToStore(['userData', 'commodityData'], {
  fetchCommodity,
  updateDescr,
  updateImg,
  updatePreviewImg,
  updatePrice,
  updateShortDescr,
  updateTitle,
})(UpdateCommodityPage, true);
