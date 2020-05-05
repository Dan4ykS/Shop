import React from 'react';
import ChangeCopies from './ChangeCopies';
import '../styles/scss/CartList.scss';

const CartList = ({ shopingCart: { cartItems }, token , actions: { onAddedToCart, onDeletedFromCart } }) => {
  // console.log(cartItems);
  if (cartItems.length === 0) {
    return <p>Вы пока не выбрали ни одного товара</p>;
  }
  
  return (
    <>
      {cartItems.map((item) => {
        return (
          <div className='cartItem col-12' key={item.id}>
            <div className='flexWrap'>
              <img className='cartItem__img' src={item.img} alt={`img:${item.id}`} />
              <div className='cartItem__info'>Книга "{item.title}"</div>
              <div className='cartItem__copies'>
                <ChangeCopies onDeletedFromCart={onDeletedFromCart} bookId={item.id} onAddedToCart={onAddedToCart} token={token} copies={item.copies} />
              </div>
              <div className='cartItem__price'>Сумма: {item.price}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CartList;
