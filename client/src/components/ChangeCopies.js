import React from 'react';
import '../styles/scss/ChangeCopies.scss';

const ChangeCopies = ({ copies, bookId, onAddedToCart, onDeletedFromCart }) => {
  return (
    <div className='changeCopies flexWrap'>
      <button onClick={() => onAddedToCart(bookId)}>
        <i className='fas fa-plus'></i>
      </button>
      <input type='text' value={copies} readOnly />
      <button onClick={() => onDeletedFromCart(bookId)}>
        <i className='fas fa-minus'></i>
      </button>
    </div>
  );
};

export default ChangeCopies;
