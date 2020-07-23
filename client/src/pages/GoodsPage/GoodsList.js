import React from 'react';
import LoadingData from '../../components/LoadingData';
import ListView from '../../components/ListView';
import CommodityPreviewCard from '../../components/CommodityPreviewCard';
import SmallCommodityPreviewCard from '../../components/CommodityPreviewCard/Small';
import { fetchGoods } from '../../actions/goodsList';
import { getDateFromLocalStorage } from '../../utils/workWithBrowser';
import { connectToStore } from '../../utils/workWithRedux';

const GoodsList = ({ goodsList: { goods, loading, error }, actions: { fetchGoods } }) => {
  return (
    <LoadingData
      configData={{
        loading,
        error,
        funcForRender: !getDateFromLocalStorage('userData') && !goods.lenght ? () => fetchGoods(0, 3) : null,
        routeForRedirect: '/Goods',
      }}
    >
      <h2 style={{ marginBottom: '30px' }}>Товары</h2>
      <div className='row'>
        <ListView
          listForRender={goods}
          ComponentForRender={SmallCommodityPreviewCard}
          AdditionalСomponentForRender={CommodityPreviewCard}
          numberToAlternate={5}
        />
      </div>
    </LoadingData>
  );
};

export default connectToStore(['goodsList'], [fetchGoods])(GoodsList);
