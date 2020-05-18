import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import '../styles/scss/ChangeCopies.scss';

const ChangeCopies = ({ copies, bookId, onAddedToCart, onDeletedFromCart, token }) => {
  return (
    <>
      <button className='btn btn-success' onClick={() => onAddedToCart(bookId, token)}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <input type='text' value={copies} readOnly />
      <button className='btn btn-danger' onClick={() => onDeletedFromCart(bookId, token)}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </>
  );
};

export default ChangeCopies;
