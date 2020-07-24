import React, { useEffect } from 'react';
import LoadingData from '../../components/LoadingData';
import ListView from '../../components/ListView';
import CommodityPreviewCard from '../../components/CommodityPreviewCard';
import SmallCommodityPreviewCard from '../../components/CommodityPreviewCard/Small';
import { connectToStore } from '../../utils/workWithRedux';

const GoodsList = ({ goodsList: { goods, loading, error }, action, ComponentWithoutData = null }) => {
  return (
    <LoadingData
      configData={{
        loading,
        error,
        funcForRender: () => action(0, 5),
        routeForRedirect: '/Goods',
      }}
    >
      <div className='row'>
        <ListView
          listForRender={goods}
          ComponentForRender={SmallCommodityPreviewCard}
          AdditionalСomponentForRender={CommodityPreviewCard}
          ComponentWithoutData={ComponentWithoutData}
          numberToAlternate={5}
        />
      </div>
    </LoadingData>
  );
};

export default connectToStore(['goodsList'], null)(GoodsList);
