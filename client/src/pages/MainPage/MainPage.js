import React from 'react';
import Slider from '../../components/Slider';
import GoodsList from '../../components/GoodsList';
import './MainPage.scss';
import { fetchBestGoods } from '../../actions/goodsList';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import AboutAuthor from './AboutAuthor';
import { scrollToTop } from '../../utils/workWithBrowser';

const MainPage = ({ actions: { fetchBestGoods } }) => {
  return (
    <div className='mainPage'>
      <Slider
        slidesToShow={1}
        slidesToScroll={1}
        content={[
          {
            slideImgSrc: '/static/firstSlide.png',
          },
          {
            slideImgSrc: '/static/secondSlide.jpg',
            slideLink: '/Goods',
          },
        ]}
      />
      <div className='mainPage__bestGoods'>
        <GoodsList typePage='Main' action={fetchBestGoods} />
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

export default connectToStore(null, { fetchBestGoods })(MainPage);
