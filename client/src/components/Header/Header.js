import React from 'react';
import Search from '../Search/Search';
import AccountItems from './AccountItems';
import logo from './logo.svg';
import './Header.scss';
import { scrollToTop, toggleSearchForMobile, showMobileSideBar, closeMobileSideBar } from '../../utils/workWithBrowser';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <>
      <header className='header'>
        <nav>
          <ul className='container flexWrap'>
            <Link
              className='header__item header__item_logo flexWrapColumn_center'
              to='/'
              onClick={() => {
                scrollToTop();
              }}
            >
              <img src={logo} alt='logo' />
            </Link>
            <Link to='/Goods/new' className='header__item' onClick={() => scrollToTop()}>
              Новинки
            </Link>
            <Link to='/Goods/popular' className='header__item' onClick={() => scrollToTop()}>
              Популярное
            </Link>
            <Link to='/Goods' className='header__item' onClick={() => scrollToTop()}>
              Все книги
            </Link>
            <div className='header__item header__item_search'>
              <Search />
            </div>
            <div className='header__item header__item_account flexWrap'>
              <AccountItems />
            </div>
            <div className='header__item_mobile header__item_nav flexWrap'>
              <FontAwesomeIcon icon={faBars} onClick={() => showMobileSideBar()} />
              <FontAwesomeIcon icon={faSearch} onClick={(e) => toggleSearchForMobile(e)} />
              <div className='search_mobile hidenElem'>
                <Search />
              </div>
            </div>
            <Link
              className='header__item_mobile header__item_logo'
              to='/'
              onClick={() => {
                scrollToTop();
              }}
            >
              <img src={logo} alt='logo' />
            </Link>
            <div className='header__item_mobile header__item_account flexWrap'>
              <AccountItems mode='mobile' />
            </div>
          </ul>
        </nav>
      </header>
      <div className='mobileSideBar flexWrapColumn_center'>
        <FontAwesomeIcon icon={faTimes} onClick={() => closeMobileSideBar()} />
        <Link
          to='/Goods/new'
          className='header__item_mobile'
          onClick={() => {
            closeMobileSideBar();
            scrollToTop();
          }}
        >
          Новинки
        </Link>
        <Link
          to='/Goods/popular'
          className='header__item_mobile'
          onClick={() => {
            closeMobileSideBar();
            scrollToTop();
          }}
        >
          Популярное
        </Link>
        <Link
          to='/Goods'
          className='header__item_mobile'
          onClick={() => {
            closeMobileSideBar();
            scrollToTop();
          }}
        >
          Все книги
        </Link>
        <div className='mobileSideBar_close' onClick={() => closeMobileSideBar()}></div>
      </div>
    </>
  );
};

export default Header;
