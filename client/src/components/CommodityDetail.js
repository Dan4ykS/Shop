import React from 'react';
import '../styles/scss/CommodityDetail.scss';
import { switchProductBtn } from '../utils/workWithCreateReactElem';
import { createValidImgSrc } from '../utils/workWithBrowser';

const CommodityDetail = ({ data: { id, previewImg, shortDescr, price, title }, actions: { onAddedToCart }, token, userName }) => {
  return (
    <div className='infoBlock col-12 col-xl-6 flexWrap'>
      <div className='infoBlock__img'>
        <img src={createValidImgSrc(previewImg?.previewImgSrc)} alt={previewImg?.previewImgAlt} />
      </div>
      <div className='infoBlock__content'>
        <h2>{title}</h2>
        <div className='description'>{shortDescr}</div>
        <div className='flexWrap btnGroup'>
          <div className='buy'>
            <span>{price}</span> Рублей
          </div>
          {switchProductBtn(userName, onAddedToCart(id, token))}
        </div>
      </div>
    </div>
  );
};

export default CommodityDetail;
