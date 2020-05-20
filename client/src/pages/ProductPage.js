import React from 'react';
import CommodityDetail from '../components/CommodityDetail';
import withStore from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import RenderList from '../components/RenderList';

const ProductPage = ({ goodsList: { goods, loading, error }, actions, userData: { token, userName } }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
        funcForRender: actions.fetchGoods,
        routeForRedirect: '/',
      }}
    >
      <h2>Товары</h2>
      <RenderList listForRender={goods} ComponentForRender={CommodityDetail} actions={actions} token={token} userName={userName} />
    </LoadingDataLogic>
  );
};

export default withStore(ProductPage);
