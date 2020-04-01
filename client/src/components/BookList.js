import React from 'react';
import '../styles/scss/BlockList.scss';

const BookList = ({ bookList: { books }, actions: { onAddedToCart } }) => {
  return (
    <div className='row'>
      {books.map((book) => {
        return (
          <div key={book.id} className='infoBlock flexWrap'>
            <div className='infoBlock__img'>
              <img src={book.img} alt={`Книга ${book.id}`} />
            </div>
            <div className='infoBlock__content'>
              <h2>{book.title}</h2>
              <div className='description'>{book.description}</div>
              <div className='flexWrap'>
                <div className='buy'>
                  <span>{book.price}</span> Рублей
                </div>
                <button onClick={() => onAddedToCart(book.id)}>В корзину</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
