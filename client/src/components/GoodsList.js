import React from 'react';
import '../styles/scss/BlockList.scss';

const goodsList = ({ goodsList: { goods }, token, actions: { onAddedToCart } }) => {
  return (
    <div className='row'>
      {goods.map((book) => {
        return (
          <div key={book._id} className='infoBlock flexWrap'>
            <div className='infoBlock__img'>
              <img src={book.previewImg} alt={`Книга ${book._id}`} />
            </div>
            <div className='infoBlock__content'>
              <h2>{book.title}</h2>
              <div className='description'>{book.descr}</div>
              <div className='flexWrap'>
                <div className='buy'>
                  <span>{book.price}</span> Рублей
                </div>
                <button onClick={() => onAddedToCart(book._id, token)}>В корзину</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default goodsList;
