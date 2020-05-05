import React from 'react';
import CartList from '../components/CartList';
import withStore from '../utils/helpFuncsForRedux';

const CartPage = ({ shopingCart, actions, userData: {token } }) => {
  const { totalPrice } = shopingCart;
  const price = totalPrice !== 0 ? <div className='totalPricc'>Сумма вашего заказа: {totalPrice}</div> : null;
  return (
    <>
      <h2>Ваш список товаров</h2>
      <CartList shopingCart={shopingCart} actions={actions} token={token} />
      {price}
    </>
  );
};

export default withStore(CartPage);
