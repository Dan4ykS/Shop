import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRubleSign } from '@fortawesome/free-solid-svg-icons';

const FullPrice = ({ totalPrice }) => {
  if (!totalPrice) {
    return null;
  }
  return (
    <>
      <span></span>
      <div className='totalPrice flexWrap_FE'>
        <div className='totalPrice__wrapper flexWrap'>
          <div className='totalPrice__text'>
            Общая стоимость: {totalPrice} <FontAwesomeIcon icon={faRubleSign} />
          </div>
          <div className='totalPrice__btn btn'>Оплатить</div>
        </div>
      </div>
    </>
  );
};

export default FullPrice;
