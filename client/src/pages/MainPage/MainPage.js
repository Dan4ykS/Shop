import React from 'react';
import Slider from '../../components/Slider';
import GoodsList from '../../components/GoodsList';
import './MainPage.scss';
import { fetchPopularGoods } from '../../actions/goodsList';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import AboutAuthor from './AboutAuthor';

const MainPage = ({ actions: { fetchPopularGoods } }) => {
  return (
    <section className='mainPage'>
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
        <GoodsList typePage='Main' action={fetchPopularGoods} />
        <Link className='btn mainPage__bestGoods-moreBtn'>Больше книг</Link>
      </div>
      <div className='mainPage__aboutAutor'>
        <AboutAuthor />
      </div>
    </section>
  );
};

export default connectToStore(null, { fetchPopularGoods })(MainPage);
