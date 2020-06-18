import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/scss/Header.scss';
import { createItems } from '../utils/workWithCreateReactElem';
import { headerFixMenu } from '../utils/workWithBrowser';

const Header = ({
  mainItems: itemsMain,
  topItems: itemsTop,
  iconsForItems: { headerIcons },
  updated,
}) => {
  useEffect(() => {
    headerFixMenu();
  }, []);

  return (
    <header className='header'>
      <nav>
        <div className='header__top'>
          <div className='container'>
            <ul className='flexWrap'>
              {createItems(itemsTop, 'header__item', headerIcons, updated)}
            </ul>
          </div>
        </div>
        <div className='header__main'>
          <div className='container'>
            <ul className='flexWrap'>{createItems(itemsMain, 'header__item header__main_item')}</ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.defaultProps = {
  mainItems: [
    { name: '/MainPage/', value: 'Главная' },
    { name: '/Bascket/', value: 'Корзина' },
  ],
};

Header.propTypes = {
  mainItems: PropTypes.array.isRequired,
};

export default Header;
