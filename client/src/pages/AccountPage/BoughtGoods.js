import React from 'react';
import Slider from '../../components/Slider';

const BoughtGoods = ({ boughtGoods }) => {
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
    };
  return (
    <>
      <div className='blockTitle'>Купленные книги</div>
      <Slider
        content={arrForSlider}
        slidesToShow={2}
        slidesToScroll={1}
        hasDots={false}
        classNames={boughtGoods.length <= 2 ? fewElements : manyElements}
      />
    </>
  );
};

export default BoughtGoods;
