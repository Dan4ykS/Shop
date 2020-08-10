import React from 'react';
import LoadingData from '../LoadingData';
import Configurate from './Configurate';
import { connectToStore } from '../../utils/workWithRedux';

const GoodsList = ({
  goodsList: { goods, loading, error },
  history,
  action,
  typePage = 'GoodsPage',
  ComponentWithoutData = null,
}) => {
  const location = history.location;
  return (
    <LoadingData
      configData={{
        loading,
        error,
        funcForRender: goods.length || (history.action === 'PUSH' && !location.state) ? null : action,
        routeForRedirect: '/',
      }}
    >
      <div className='row'>
        <Configurate typePage={typePage} goods={goods} ComponentWithoutData={ComponentWithoutData} />
      </div>
    </LoadingData>
  );
};

export default connectToStore(['goodsList'], null)(GoodsList, true);
