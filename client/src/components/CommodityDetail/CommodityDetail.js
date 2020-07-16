import React from 'react';
import SwitchCommodityBtn from './SwitchCommodityBtn';
import './CommodityDetail.scss';
import { createValidImgSrc } from '../../utils/workWithBrowser';

const CommodityDetail = ({ data: { id, previewImg, shortDescr, price, title } }) => {
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
          <SwitchCommodityBtn id={id} />
        </div>
      </div>
    </div>
  );
};

export default CommodityDetail;
