import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/scss/Header.scss';
import { createItems } from '../utils/workWithCreateReactElem';
import { headerFixMenu } from '../utils/workWithBrowser';
import { connectToStore } from '../utils/workWithRedux';
import { updateTopHeaderMenu } from '../actions/menuItems';

const Header = ({
  menuItems: {
    mainItems: itemsMain,
    topItems: itemsTop,
    iconsForItems: { headerIcons },
    updated,
  },
  userData: { userName },
  actions: { updateTopHeaderMenu }
}) => {
  useEffect(() => {
    headerFixMenu();
  }, []);

   useEffect(() => {
     updateTopHeaderMenu(userName);
   }, [userName, updateTopHeaderMenu]);

  return (
    <header className='header'>
      <nav>
        <div className='header__top'>
          <div className='container'>
            <ul className='flexWrap'>{createItems(itemsTop, 'header__item', headerIcons, updated)}</ul>
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

export default connectToStore(['menuItems', 'userData'], [updateTopHeaderMenu])(Header);
