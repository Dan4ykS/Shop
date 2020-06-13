import React from 'react';
import ChangeCopies from './ChangeCopies';
import '../styles/scss/CartCommudityDetail.scss';
import { redirectToPage } from '../utils/workWithBrowser';
import { Link } from 'react-router-dom';

const CartCommudityDetail = ({ data: { id, imgSrc, title, price, copies }, token, actions: { onAddedToCart, onDeletedFromCart }, history }) => {
  return (
    <div className='cartItem col-xl-6 col-12'>
      <div className='flexWrap'>
        <img className='cartItem__img' src={`/${imgSrc}`} alt={`img:${id}`} />
        <div className='cartItem__info' onClick={() => redirectToPage(history)}>
          <Link to={`/Product/${id}/`}>Книга "{title}"</Link>
        </div>
        <ChangeCopies onDeletedFromCart={onDeletedFromCart} bookId={id} onAddedToCart={onAddedToCart} token={token} copies={copies} />
        <div className='cartItem__price'>Сумма: {price}</div>
      </div>
    </div>
  );
};

export default CartCommudityDetail;
