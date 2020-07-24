import React from 'react';
import GoodsList from './GoodsList';
import './GoodsPage.scss';
import { Redirect } from 'react-router';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchGoods, searchGoods } from '../../actions/goodsList';

const GoodsPage = ({ actions: { fetchGoods, searchGoods }, history }) => {
  const path = history.location.pathname;
  if (path === '/Goods') {
    return <GoodsList action={fetchGoods} />;
  } else if (path === '/Goods/new') {
    return (
      <div className='goods'>
        <h2>Горячие новинки !</h2>
        <GoodsList action={fetchGoods} />
      </div>
    );
  } else if (path === '/Goods/popular') {
    return (
      <div className='goods'>
        <h2>Самые поулярные товары !</h2>
        <GoodsList action={fetchGoods} />
      </div>
    );
  } else if (path.includes('/Goods/serch=')) {
    const query = path.split('=')[1];
    return (
      <div className='goods'>
        <h2>Результат поиска "{query}"</h2>
        <GoodsList
          action={() => searchGoods(query)}
          ComponentWithoutData={() => <h2>Извините, на данных по {query} нет</h2>}
        />
      </div>
    );
  } else {
    return <Redirect to='/Goods' />;
  }
};

export default connectToStore(null, { fetchGoods, searchGoods })(GoodsPage);
