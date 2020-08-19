import React from 'react';
import Search from '../Search/Search';
import AccountItems from './AccountItems';
import logo from './logo.svg';
import './Header.scss';
import { scrollToTop } from '../../utils/workWithBrowser';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchGoods } from '../../actions/goodsList';
import { showMobileSideBar, toggleSearchForMobile, closeMobileSideBar } from './utils';

const Header = ({ actions: { fetchGoods }, history }) => {
  return (
    <header className='header'>
      <nav>
        <ul className='container flexWrap'>
          <Link
            className='header__item header__item_logo flexWrapColumn_center'
            to='/'
            onClick={() => {
              scrollToTop();
              fetchGoods({ type: 'bestGoods' });
            }}
          >
            <img src={logo} alt='logo' />
          </Link>
          <Link
            to='/Goods/new'
            className='header__item'
            onClick={() => {
              scrollToTop();
              fetchGoods({ type: 'newGoods' });
            }}
          >
            Новинки
          </Link>
          <Link
            to='/Goods/popular'
            className='header__item'
            onClick={(e) => {
              scrollToTop();
              fetchGoods({ type: 'popularGoods' });
            }}
          >
            Популярное
          </Link>
          <Link
            to='/Goods'
            className='header__item'
            onClick={() => {
              scrollToTop();
              fetchGoods({});
            }}
          >
            Все книги
          </Link>
          <div className='header__item header__item_search'>
            <Search />
          </div>
          <div className='header__item header__item_account flexWrap_center'>
            <AccountItems />
          </div>
          <div className='header__item_mobile header__item_nav flexWrap'>
            <FontAwesomeIcon icon={faBars} onClick={() => showMobileSideBar()} />
            <FontAwesomeIcon icon={faSearch} onClick={(e) => toggleSearchForMobile(e)} />
            <div className='search_mobile hiddenElem'>
              <Search />
            </div>
          </div>
          <Link
            className='header__item_mobile header__item_logo'
            to='/'
            onClick={() => {
              scrollToTop();
              fetchGoods({ type: 'bestGoods' });
            }}
          >
            <img src={logo} alt='logo' />
          </Link>
          <div className='header__item_mobile header__item_account flexWrap'>
            <AccountItems mode='mobile' />
          </div>
        </ul>
        <div className='mobileSideBar flexWrapColumn_center'>
          <FontAwesomeIcon icon={faTimes} onClick={() => closeMobileSideBar()} />
          <Link
            to='/Goods/new'
            className='header__item_mobile'
            onClick={() => {
              closeMobileSideBar();
              scrollToTop();
              fetchGoods({ type: 'newGoods' });
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
              fetchGoods({ type: 'popularGoods' });
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
              fetchGoods({});
            }}
          >
            Все книги
          </Link>
          <div className='mobileSideBar_close' onClick={() => closeMobileSideBar()}></div>
        </div>
      </nav>
    </header>
  );
};

export default connectToStore(null, { fetchGoods })(Header);
