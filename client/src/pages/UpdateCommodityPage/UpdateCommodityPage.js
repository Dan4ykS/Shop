import React from 'react';
import LoadingData from '../../components/LoadingData';
import ChangeCommodityDetail from '../../components/ChangeCommodityDetail';
import { findPathParams, STORE_NAME } from '../../utils/workWithBrowser';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchCommodity, reloadCommodityData } from '../../actions/commodityData';
import { ReactTitle } from 'react-meta-tags';

const UpdateCommodityPage = ({
  commodityData: { loading, error: commodityError, title },
  actions: { fetchCommodity, reloadCommodityData },
  userData: { token, error: userError },
  history,
}) => {
  return (
    <div className='updateCommodityPage'>
      <ReactTitle title={`${STORE_NAME} | Обновление данных о книге "${title}"`} />
      <LoadingData
        configData={{
          loading: loading,
          error: userError ? userError : commodityError,
          funcForRender: token
            ? () => {
                reloadCommodityData();
                fetchCommodity(findPathParams(history));
              }
            : null,
          routeForRedirect: commodityError ? `/admin/updateCommodity?id=${findPathParams(history)}` : '/Login/',
        }}
      >
        <ChangeCommodityDetail type='update' />
      </LoadingData>
    </div>
  );
};

export default connectToStore(['userData', 'commodityData'], {
  fetchCommodity,
  reloadCommodityData,
})(UpdateCommodityPage, true);
