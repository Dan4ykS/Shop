import React from 'react';
import '../styles/scss/BlockList.scss';

const goodsList = ({ goodsList: { goods }, token, actions: { onAddedToCart } }) => {
  return (
    <div className='row'>
      {goods.map((commodity) => {
        return (
          <div key={commodity._id} className='infoBlock flexWrap'>
            <div className='infoBlock__img'>
              <img src={commodity.previewImg} alt={`Книга ${commodity._id}`} />
            </div>
            <div className='infoBlock__content'>
              <h2>{commodity.title}</h2>
              <div className='description'>{commodity.descr}</div>
              <div className='flexWrap'>
                <div className='buy'>
                  <span>{commodity.price}</span> Рублей
                </div>
                <button onClick={() => onAddedToCart(commodity._id, token)}>В корзину</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default goodsList;
