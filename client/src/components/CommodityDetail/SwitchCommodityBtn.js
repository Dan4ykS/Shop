import React from 'react';
import { Link } from 'react-router-dom';
import { onAddedToCart } from '../../actions/shopingCart';
import { connectToStore } from '../../utils/workWithRedux';

const SwitchCommodityBtn = ({ userData: { token, userName }, actions: { onAddedToCart }, id }) => {
  if (userName === 'admin') {
    return (
      <Link className='btn btn-success' to={`/admin/updateCommodity/${id}`}>
        Редактировать товар
      </Link>
    );
  }
  if (!userName) {
    return (
      <div className='flexWrap'>
        <button onClick={() => console.log(id, token)}>Купить в один клик</button>
        <Link className='btn btn-primary' to={`/Product/${id}`}>
          Подробнее
        </Link>
      </div>
    );
  }
  if (userName) {
    return (
      <div className='flexWrap'>
        <button>Купить в один клик!</button>
        <button onClick={() => onAddedToCart(id, token)}>В корзину</button>
        <Link className='btn btn-primary' to={`/Product/${id}`}>
          Подробнее
        </Link>
      </div>
    );
  }
};

export default connectToStore(['userData'], [onAddedToCart])(SwitchCommodityBtn);
