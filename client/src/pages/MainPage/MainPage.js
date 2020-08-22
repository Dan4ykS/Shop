import React from 'react';
import AboutAuthor from './AboutAuthor';
import GoodsList from '../../components/GoodsList';
import MainSlider from './MainSlider';
import './MainPage.scss';
import { fetchGoods } from '../../actions/goodsList';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import { scrollToTop, STORE_NAME } from '../../utils/workWithBrowser';
import { ReactTitle } from 'react-meta-tags';

const MainPage = ({ actions: { fetchGoods } }) => {
  return (
    <div className='mainPage'>
      <ReactTitle title={`${STORE_NAME} | Главная`}/>
      <MainSlider />
      <div className='mainPage__bestGoods'>
        <GoodsList typePage='Main' action={() => fetchGoods({ type: 'bestGoods', limit: 7 })} />
        <Link to='/Goods' className='btn mainPage__bestGoods-moreBtn' onClick={() => scrollToTop()}>
          Больше книг
        </Link>
      </div>
      <div className='mainPage__aboutAuthor'>
        <AboutAuthor />
      </div>
    </div>
  );
};

export default connectToStore(null, { fetchGoods })(MainPage);
