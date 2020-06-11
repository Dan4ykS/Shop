import React, { useEffect } from 'react';
import CommodityDetail from '../components/CommodityDetail';
import withStore from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import RenderList from '../components/RenderList';
import { getDateFromLocalStorage } from '../utils/workWithBrowser';

const ProductPage = ({ goodsList: { goods, loading, error }, actions, userData: { token, userName } }) => {
  useEffect(() => {
    console.log(loading);
  }, []);
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
        funcForRender:  !getDateFromLocalStorage('userData') ? actions.fetchGoods : null,
        routeForRedirect: '/',
      }}
    >
      <h2>Товары</h2>
      <RenderList listForRender={goods} ComponentForRender={CommodityDetail} actions={actions} token={token} userName={userName} />
    </LoadingDataLogic>
  );
};

export default withStore(ProductPage);
