import React from 'react';
import ChangeCopies from './ChangeCopies';
import './CartCommudityDetail.scss';
import { redirectToPage, createValidImgSrc } from '../../../utils/workWithBrowser';
import { Link } from 'react-router-dom';

const CartCommudityDetail = ({
  data: { id, imgSrc, title, price, copies, alt },
  history,
}) => {
  return (
    <div className='cartItem col-xl-6 col-12'>
      <div className='flexWrap'>
        <img className='cartItem__img' src={createValidImgSrc(imgSrc)} alt={alt} />
        <div className='cartItem__info' onClick={() => redirectToPage(history)}>
          <Link to={`/Product/${id}/`}>Книга "{title}"</Link>
        </div>
        <ChangeCopies
          bookId={id}
          copies={copies}
        />
        <div className='cartItem__price'>Сумма: {price}</div>
      </div>
    </div>
  );
};

export default CartCommudityDetail;
