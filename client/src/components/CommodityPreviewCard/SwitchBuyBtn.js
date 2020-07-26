import React from 'react';
import { Link } from 'react-router-dom';
import { onAddedToCart } from '../../actions/shopingCart';
import { connectToStore } from '../../utils/workWithRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

const SwitchBuyBtn = ({ userData: { token, userName }, actions: { onAddedToCart }, id }) => {
  if (userName === 'admin') {
    return (
      <Link className='btn' to={`/admin/updateCommodity/${id}`}>
        <FontAwesomeIcon icon={faWrench}/>
      </Link>
    );
  }
  if (!userName) {
    return <button className='btn' onClick={() => console.log('Открыть окнопокупки!')}>Купить</button>;
  }
  if (userName) {
    return <button className='btn' onClick={() => onAddedToCart(id, token)}>Купить</button>;
  }
};

export default connectToStore(['userData'], { onAddedToCart })(SwitchBuyBtn);
