import React from 'react';
import LoadingData from '../LoadingData';

import { connectToStore } from '../../utils/workWithRedux';
import Configurate from './Configurate';

const GoodsList = ({
  goodsList: { goods, loading, error },
  action,
  typePage = 'GoodsPage',
  ComponentWithoutData = null,
}) => {
  return (
    <LoadingData
      configData={{
        loading,
        error,
        funcForRender: goods.length ? null : action,
        routeForRedirect: '/',
      }}
    >
      <div className='row'>
        <Configurate typePage={typePage} goods={goods} ComponentWithoutData={ComponentWithoutData} />
      </div>
    </LoadingData>
  );
};

export default connectToStore(['goodsList'], null)(GoodsList);
