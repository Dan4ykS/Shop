import React from 'react';
import { fetchGoods } from '../../actions/goodsList';
import LoadingData from '../../components/LoadingData';
import ListView from '../../components/ListView';
import CommodityDetail from '../../components/CommodityDetail/CommodityDetail';
import { getDateFromLocalStorage } from '../../utils/workWithBrowser';
import { connectToStore } from '../../utils/workWithRedux';

const GoodsList = ({ goodsList: { goods, loading, error }, actions: { fetchGoods } }) => {
  return (
    <LoadingData
      configData={{
        loading,
        error,
        funcForRender: !getDateFromLocalStorage('userData') && !goods.lenght ? () => fetchGoods(0, 3) : null,
        routeForRedirect: '/',
      }}
    >
      <h2>Товары</h2>
      <ListView listForRender={goods} ComponentForRender={CommodityDetail} />
    </LoadingData>
  );
};

export default connectToStore(['goodsList'], [fetchGoods])(GoodsList);
