import React from 'react';
import GoodsList from '../../components/GoodsList';
import Continuation from './Continuations';
import './GoodsPage.scss';
import { Redirect } from 'react-router';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchGoods } from '../../actions/goodsList';
import { STORE_NAME } from '../../utils/workWithBrowser';
import { ReactTitle } from 'react-meta-tags';

const GoodsPage = ({ actions: { fetchGoods }, history }) => {
  const location = history.location,
    path = location.pathname;
  let pageHeader = null,
    configDataForAction = null,
    ComponentWithoutData = null;

  if (path === '/Goods') {
    configDataForAction = { type: 'default' };
  } else if (path === '/Goods/new') {
    configDataForAction = { type: 'newGoods' };
    pageHeader = <h2>Горячие новинки !</h2>;
  } else if (path === '/Goods/popular') {
    configDataForAction = { type: 'popularGoods' };
    pageHeader = <h2>Самые популярные товары !</h2>;
  } else if (path.includes('/Goods/serch=')) {
    const query = path.split('=')[1];
    configDataForAction = { type: 'search', strForSearch: query };
    pageHeader = <h2>Результаты поиска по запросу "{query}"</h2>;
    ComponentWithoutData = () => <h2>Извините, но по запросу "{query}" ничего небыло найдено</h2>;
  } else {
    return <Redirect to='/Goods' />;
  }

  return (
    <div className='goodsPage'>
      <ReactTitle title={`${STORE_NAME} | Книги`} />
      {pageHeader}
      <div className='goodsPage__content'>
        <GoodsList action={() => fetchGoods(configDataForAction)} ComponentWithoutData={ComponentWithoutData} />
      </div>
      <Continuation actionType={configDataForAction?.type} />
    </div>
  );
};

export default connectToStore(null, { fetchGoods })(GoodsPage);
