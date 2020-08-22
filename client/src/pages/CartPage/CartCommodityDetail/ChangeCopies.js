import React from 'react';
import './ChangeCopies.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { connectToStore } from '../../../utils/workWithRedux';
import { onAddedToCart, onDeletedFromCart } from '../../../actions/shopingCart';

const ChangeCopies = ({ userData: { token }, actions: { onAddedToCart, onDeletedFromCart }, copies, commodityId }) => {
  return (
    <div className='cartItem__copies flexWrap_center'>
      <button className='btn btnMinus' onClick={() => onDeletedFromCart(commodityId, token)}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <input type='text' value={copies} className='formControl' readOnly />
      <button className='btn btnPlus' onClick={() => onAddedToCart(commodityId, token)}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default connectToStore(['userData.token'], { onAddedToCart, onDeletedFromCart })(ChangeCopies);
