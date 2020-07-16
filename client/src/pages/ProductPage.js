import React from 'react';
import CommodityDetail from '../components/CommodityDetail';
import { connectToStore } from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import ListView from '../components/ListView';
import { getDateFromLocalStorage } from '../utils/workWithBrowser';
import { onAddedToCart } from '../actions/shopingCart';

const ProductPage = ({ goodsList: { goods, loading, error }, actions, userData: { token, userName } }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
        funcForRender: !getDateFromLocalStorage('userData') ? () => actions.fetchGoods(0, 3) : null,
        routeForRedirect: '/',
      }}
    >
      <h2>Товары</h2>
      <ListView
        listForRender={goods}
        ComponentForRender={CommodityDetail}
        actions={actions}
        token={token}
        userName={userName}
      />
    </LoadingDataLogic>
  );
};

export default connectToStore(['goodsList', 'userData'], [onAddedToCart])(ProductPage);
