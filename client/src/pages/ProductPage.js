import React from 'react';
import CommodityDetail from '../components/CommodityDetail';
import withStore from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import RenderList from '../components/RenderList';
import { useCallback } from 'react';

const ProductPage = ({ goodsList: { goods, loading, error }, actions, userData: { token, userName } }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
        funcForRender: actions.fetchGoods,
        routeForRedirect: '/Product/',
      }}
    >
      <h2>Товары</h2>
      <RenderList listForRender={goods} ComponentForRender={CommodityDetail} actions={actions} token={token} userName={userName} />
    </LoadingDataLogic>
  );
};

export default withStore(ProductPage);
