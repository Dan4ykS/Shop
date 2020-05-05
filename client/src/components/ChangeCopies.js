import React from 'react';
import '../styles/scss/ChangeCopies.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const ChangeCopies = ({ copies, bookId, onAddedToCart, onDeletedFromCart, token }) => {
  return (
    <div className='changeCopies flexWrap'>
      <button onClick={() => onAddedToCart(bookId, token)}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <input type='text' value={copies} readOnly />
      <button onClick={() => onDeletedFromCart(bookId, token)}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </div>
  );
};

export default ChangeCopies;
