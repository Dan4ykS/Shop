import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCartPlus, faTools } from '@fortawesome/free-solid-svg-icons';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/workWithBrowser';

const AccountItems = ({ userData: { userName }, mode = 'desktop' }) => {
  if (userName === 'admin') {
    return (
      <>
        <Link to='/admin' className='flexWrap' onClick={() => scrollToTop()}>
          <FontAwesomeIcon icon={faTools} />
          <div className={mode === 'mobile' ? 'hidenElem' : null}>Админ панель</div>
        </Link>
      </>
    );
  } else if (!userName) {
    return (
      <>
        <Link to='/Login' className='flexWrap' onClick={() => scrollToTop()}>
          <FontAwesomeIcon icon={faUserCircle} />
          <div className={mode === 'mobile' ? 'hidenElem' : null}>Вход</div>
        </Link>
        <div className={mode === 'mobile' ? 'hidenElem' : null}>/</div>
        <Link className={mode === 'mobile' ? 'hidenElem' : null} to='/Registration' onClick={() => scrollToTop()}>
          Регистрация
        </Link>
      </>
    );
  } else {
    return (
      <>
        <Link to='/MyAccount' className='flexWrap' onClick={() => scrollToTop()}>
          <FontAwesomeIcon icon={faUserCircle} />
          <div className={mode === 'mobile' ? 'hidenElem' : null}>Аккаунт</div>
        </Link>
        <div className={mode === 'mobile' ? 'hidenElem' : null}>/</div>
        <Link to='/Cart' className='flexWrap' onClick={() => scrollToTop()}>
          <FontAwesomeIcon icon={faCartPlus} />
          <div className={mode === 'mobile' ? 'hidenElem' : null}>Корзина</div>
        </Link>
      </>
    );
  }
};

export default connectToStore(['userData'], null)(AccountItems);
