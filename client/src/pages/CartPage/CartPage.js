import React, { useEffect } from 'react';
import ListView from '../../components/ListView';
import CartCommudityDetail from './CartCommodityDetail';
import LoadingData from '../../components/LoadingData';
import './CartPage.scss';
import { connectToStore } from '../../utils/workWithRedux';
import { redirectToPage } from '../../utils/workWithBrowser';

const CartPage = ({ shopingCart: { totalPrice, cart, loading, updatedPrice }, userData: { userName }, history }) => {
  useEffect(() => {
    if (userName === 'admin') {
      redirectToPage(history, '/admin/');
    }
  }, [userName, history]);

  useEffect(() => {
    if (updatedPrice) {
      alert('Внимание, цены на товары в вашей корзине поменялись');
    }
  }, [updatedPrice]);

  const price = totalPrice !== 0 ? <div className='totalPrice'>Сумма вашего заказа: {totalPrice}</div> : null;

  return (
    <LoadingData
      configData={{
        loading: userName ? false : loading,
        error: null,
      }}
    >
      <h2>Ваш список товаров</h2>
      <ListView
        listForRender={cart}
        ComponentForRender={CartCommudityDetail}
        ComponentWithoutData={<h3>Вы еще ничего не выбрали</h3>}
        history={history}
      />
      {price}
    </LoadingData>
  );
};

export default connectToStore(['shopingCart', 'userData.userName'], null)(CartPage);
