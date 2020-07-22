import React from 'react';
import { Link } from 'react-router-dom';
import { onAddedToCart } from '../../actions/shopingCart';
import { connectToStore } from '../../utils/workWithRedux';

const SwitchBuyBtn = ({ userData: { token, userName }, actions: { onAddedToCart }, id }) => {
  if (userName === 'admin') {
    return (
      <Link className='btn' to={`/admin/updateCommodity/${id}`}>
        Редактировать
      </Link>
    );
  }
  if (!userName) {
    return <button onClick={() => console.log('Открыть окнопокупки!')}>Купить</button>;
  }
  if (userName) {
    return <button onClick={() => onAddedToCart(id, token)}>Купить</button>;
  }
};

export default connectToStore(['userData'], [onAddedToCart])(SwitchBuyBtn);
