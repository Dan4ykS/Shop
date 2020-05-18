import React from 'react';
import ChangeCopies from './ChangeCopies';
import '../styles/scss/CartCommudityDetail.scss';

const CartCommudityDetail = ({ data: { id, img, title, price, copies }, token, actions: { onAddedToCart, onDeletedFromCart } }) => {
  return (
    <div className='cartItem col-xl-6 col-12'>
      <div className='flexWrap'>
        <img className='cartItem__img' src={`/${img}`} alt={`img:${id}`} />
        <div className='cartItem__info'>Книга "{title}"</div>
        <div className='cartItem__copies flexWrap'>
          <ChangeCopies onDeletedFromCart={onDeletedFromCart} bookId={id} onAddedToCart={onAddedToCart} token={token} copies={copies} />
        </div>
        <div className='cartItem__price'>Сумма: {price}</div>
      </div>
    </div>
  );
};

export default CartCommudityDetail;
