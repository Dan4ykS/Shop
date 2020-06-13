import React from 'react';
import '../styles/scss/CommodityDetail.scss';
import { switchProductBtn } from '../utils/workWithCreateReactElem';

const CommodityDetail = ({ data: { id, previewImgSrc, shortDescr, price, title }, token, userName, actions: { onAddedToCart } }) => {
  return (
    <div className='infoBlock col-12 col-xl-6 flexWrap'>
      <div className='infoBlock__img'>
        <img src={`/${previewImgSrc}`} alt={`Книга ${id}`} />
      </div>
      <div className='infoBlock__content'>
        <h2>{title}</h2>
        <div className='description'>{shortDescr}</div>
        <div className='flexWrap btnGroup'>
          <div className='buy'>
            <span>{price}</span> Рублей
          </div>
          {switchProductBtn(userName, onAddedToCart, id, token)}
        </div>
      </div>
    </div>
  );
};

export default CommodityDetail;
