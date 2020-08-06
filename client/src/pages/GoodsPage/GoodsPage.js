import React from 'react';
import GoodsList from '../../components/GoodsList';
import './GoodsPage.scss';
import { Redirect } from 'react-router';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchGoods, searchGoods, fetchPopularGoods, fetchNewGoods } from '../../actions/goodsList';

const GoodsPage = ({ actions: { fetchGoods, searchGoods, fetchNewGoods, fetchPopularGoods }, history }) => {
  const location = history.location,
    path = location.pathname;
  let pageHeader = null,
    actionForGoodsList = null,
    ComponentWithoutData = null;

  if (path === '/Goods') {
    actionForGoodsList = history.action === 'PUSH' && location.state !== 'fromNotFound' ? null : fetchGoods;
  } else if (path === '/Goods/new') {
    actionForGoodsList = history.action === 'PUSH' ? null : fetchNewGoods;
    pageHeader = <h2>Горячие новинки !</h2>;
  } else if (path === '/Goods/popular') {
    actionForGoodsList = history.action === 'PUSH' ? null : fetchPopularGoods;
    pageHeader = <h2>Самые популярные товары !</h2>;
  } else if (path.includes('/Goods/serch=')) {
    const query = path.split('=')[1];
    actionForGoodsList = history.action === 'PUSH' ? null : () => searchGoods(query);
    pageHeader = <h2>Результаты поиска по запросу "{query}"</h2>;
    ComponentWithoutData = () => <h2>Извините, но по запросу "{query}" ничего небыло найдено</h2>;
  } else {
    return <Redirect to='/Goods' />;
  }

  return (
    <div className='goodsPage'>
      {pageHeader}
      <GoodsList action={actionForGoodsList} ComponentWithoutData={ComponentWithoutData} />
    </div>
  );
};

export default connectToStore(null, { fetchGoods, searchGoods, fetchPopularGoods, fetchNewGoods })(GoodsPage);
