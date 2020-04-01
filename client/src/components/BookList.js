import React from 'react';
import '../styles/scss/BlockList.scss';

const BookList = ({ bookList: { books }, actions: { onAddedToCart } }) => {
  return (
    <div className='row'>
      {books.map((book) => {
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
                <button onClick={() => onAddedToCart(book._id)}>В корзину</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
