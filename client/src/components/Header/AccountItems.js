import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCartPlus, faTools } from '@fortawesome/free-solid-svg-icons';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/workWithBrowser';

const AccountItems = ({ userData: { userName }, shopingCart: { countGoods }, mode = 'desktop' }) => {
  if (userName === 'admin') {
    return (
      <>
        <Link to='/admin' className='flexWrap elem' onClick={() => scrollToTop()}>
          <FontAwesomeIcon icon={faTools} />
          <div className={mode === 'mobile' ? 'hiddenElem' : null}>Админ панель</div>
        </Link>
      </>
    );
  } else if (!userName) {
    return (
      <>
        <Link to='/Login' className='flexWrap elem' onClick={() => scrollToTop()}>
          <FontAwesomeIcon icon={faUserCircle} />
          <div className={mode === 'mobile' ? 'hiddenElem' : null}>Вход</div>
        </Link>
        <div className={mode === 'mobile' ? 'hiddenElem' : null}>/</div>
        <Link className={mode === 'mobile' ? 'hiddenElem' : 'elem'} to='/Registration' onClick={() => scrollToTop()}>
          Регистрация
        </Link>
      </>
    );
  } else {
    return (
      <>
        <Link to='/MyAccount' className='flexWrap elem' onClick={() => scrollToTop()}>
          <FontAwesomeIcon icon={faUserCircle} />
          <div className={mode === 'mobile' ? 'hiddenElem' : null}>{userName}</div>
        </Link>
        <div className={mode === 'mobile' ? 'hiddenElem' : null}>/</div>
        <Link to='/Cart' className='flexWrap elem' onClick={() => scrollToTop()}>
          <FontAwesomeIcon icon={faCartPlus} />
          <span className={countGoods ? null : 'hiddenElem'}>{countGoods}</span>
        </Link>
      </>
    );
  }
};

export default connectToStore(['userData', 'shopingCart.countGoods'], null)(AccountItems);
