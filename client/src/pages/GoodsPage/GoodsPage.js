import React from 'react';
import GoodsList from './GoodsList';
import './GoodsPage.scss';
import { Redirect } from 'react-router';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchGoods, searchGoods, fetchPopularGoods, fetchNewGoods } from '../../actions/goodsList';

const GoodsPage = ({ actions: { fetchGoods, searchGoods, fetchNewGoods, fetchPopularGoods }, history }) => {
  const path = history.location.pathname;
  let pageHeader = null,
    actionForGoodsList = null,
    ComponentWithoutData = null;
  
  if (path === '/Goods') {
    actionForGoodsList = fetchGoods;
  } else if (path === '/Goods/new') {
    actionForGoodsList = fetchNewGoods;
    pageHeader = <h2>Горячие новинки !</h2>
  } else if (path === '/Goods/popular') {
    actionForGoodsList = fetchPopularGoods;
    pageHeader = <h2>Самые популярные товары !</h2>;
  } else if (path.includes('/Goods/serch=')) {
    const query = path.split('=')[1];
    actionForGoodsList = () => searchGoods(query)
    pageHeader = <h2>Результаты поиска по запросу "{query}"</h2>
    ComponentWithoutData = () => <h2>Извините, но по запросу "{query}" ничего небыло найдено</h2>
  } else {
    return <Redirect to='/Goods' />;
  }

  return (
    <div className='goods'>
      {pageHeader}
      <GoodsList
        action={actionForGoodsList}
        ComponentWithoutData={ComponentWithoutData}
      />
    </div>
  );
};

export default connectToStore(null, { fetchGoods, searchGoods, fetchPopularGoods, fetchNewGoods })(GoodsPage);
