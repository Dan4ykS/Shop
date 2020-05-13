import React from 'react';
import PropTypes from 'prop-types';
import { createItems } from '../utils/helpFuncsForCreateReactElem';
import { headerFixMenu } from '../utils/helpFuncsForBrouser';
import '../styles/scss/Header.scss';

const Header = ({ mainItems: itemsMain, topItems: itemsTop, iconsForItems: { headerIcons }, updated, userName }) => {
  headerFixMenu();
  const mainItems = createItems(itemsMain, 'header__item header__main_item');
  const topItems = createItems(itemsTop, 'header__item', headerIcons, updated);
  return (
    <header className='header'>
      <nav>
        <div className='header__top'>
          <div className='container'>
            <ul className='flexWrap'>{topItems}</ul>
          </div>
        </div>
        <div className='header__main'>
          <div className='container'>
            <ul className='flexWrap'>{mainItems}</ul>
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
