import React from 'react';
import Slider from '../../components/Slider';
import { connectToStore } from '../../utils/workWithRedux';

const BoughtGoods = ({ userData: { boughtGoods } }) => {
  if (!boughtGoods?.length) {
    return null;
  }
  const arrForSlider = boughtGoods.map(({ previewImg, rating, id }) => ({
    slideImgSrc: previewImg,
    slideDetail: { rating: rating },
    slideLink: `/Goods/commodity-${id}`,
  })),
    fewElements = {
      sliderNextBtn: 'hiddenElem',
      sliderPrevBtn: 'hiddenElem',
      sliderItemImgWrapper: 'slider__item-imgWrapper slider__item-imgWrapper_bougthGoods',
    },
    manyElements = {
      sliderItemImgWrapper: 'slider__item-imgWrapper slider__item-imgWrapper_bougthGoods',
    },
    screenWidth = window.screen.width;

  return (
    <>
      <div className='blockTitle'>Купленные книги</div>
      <Slider
        content={arrForSlider}
        slidesToShow={screenWidth > 575 ? 2 : 1}
        slidesToScroll={boughtGoods.length > 4 && screenWidth > 575 ? 2 : 1}
        hasDots={false}
        classNames={boughtGoods.length <= 2 ? fewElements : manyElements}
      />
    </>
  );
};

export default connectToStore(['userData.boughtGoods'], null)(BoughtGoods);
