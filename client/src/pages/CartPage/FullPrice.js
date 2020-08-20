import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRubleSign } from '@fortawesome/free-solid-svg-icons';
import { connectToStore } from '../../utils/workWithRedux';
import { buyGoods } from '../../actions/shopingCart';

const FullPrice = ({ shopingCart: { totalPrice }, userData: { token }, actions: { buyGoods }, history }) => {
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
          <button
            className='totalPrice__btn btn'
            onClick={async (e) => {
              e.persist();
              e.preventDefault();
              const elem = e.target;
              elem.disabled = true;
              await buyGoods(token, history);
              elem.disabled = false;
            }}
          >
            Оплатить
          </button>
        </div>
      </div>
    </>
  );
};

export default connectToStore(['shopingCart.totalPrice', 'userData.token'], { buyGoods })(FullPrice, true);
