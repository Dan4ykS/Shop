import React from 'react';
import CartCommudityDetail from '../components/CartCommudityDetail';
import withStore from '../utils/workWithRedux';
import RenderList from '../components/RenderList';
import '../styles/scss/CartPage.scss';
import { redirectToPage } from '../utils/workWithBrowser';
import LoadingDataLogic from '../logicComponents/LoadingData';

const CartPage = ({ shopingCart: { totalPrice, cart, loading }, actions, userData: { token, userName }, history }) => {
  if (userName === 'admin') {
    redirectToPage(history, '/admin/');
  }
  const price = totalPrice !== 0 ? <div className='totalPrice'>Сумма вашего заказа: {totalPrice}</div> : null;
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: null,
      }}
    >
      <h2>Ваш список товаров</h2>
      <RenderList listForRender={cart} ComponentForRender={CartCommudityDetail} ComponentWithoutData={<h3>Вы еще ничего не выбрали</h3>} actions={actions} token={token} history={history} />
      {price}
    </LoadingDataLogic>
  );
};

export default withStore(CartPage);
