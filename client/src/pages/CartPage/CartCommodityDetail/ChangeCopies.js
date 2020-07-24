import React from 'react';
import './ChangeCopies.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { connectToStore } from '../../../utils/workWithRedux';
import { onAddedToCart, onDeletedFromCart } from '../../../actions/shopingCart';

const ChangeCopies = ({ userData: { token }, actions: { onAddedToCart, onDeletedFromCart }, copies, bookId }) => {
  return (
    <div className='cartItem__copies flexWrap'>
      <button className='btn-success' onClick={() => onAddedToCart(bookId, token)}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <input type='text' value={copies} readOnly />
      <button className='btn-danger' onClick={() => onDeletedFromCart(bookId, token)}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </div>
  );
};

export default connectToStore(['userData.token'], { onAddedToCart, onDeletedFromCart })(ChangeCopies);
