import React, { useEffect } from 'react';
import CartCommudityDetail from '../components/CartCommudityDetail';
import { connectToStore } from '../utils/workWithRedux';
import ListView from '../components/ListView';
import '../styles/scss/CartPage.scss';
import { redirectToPage } from '../utils/workWithBrowser';
import LoadingDataLogic from '../logicComponents/LoadingData';

const CartPage = ({
  shopingCart: { totalPrice, cart, loading, updatedPrice },
  actions,
  userData: { token, userName },
  history,
}) => {
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
    <LoadingDataLogic
      configData={{
        loading,
        error: null,
      }}
    >
      <h2>Ваш список товаров</h2>
      <ListView
        listForRender={cart}
        ComponentForRender={CartCommudityDetail}
        ComponentWithoutData={<h3>Вы еще ничего не выбрали</h3>}
        actions={actions}
        token={token}
        history={history}
      />
      {price}
    </LoadingDataLogic>
  );
};

export default connectToStore(['shopingCart', 'userData'], null)(CartPage);
