import React from 'react';
import Slider from '../../components/Slider';

const MainSlider = () => {
  return (
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
      classNames={{
        slider: 'slider slider_main',
        sliderItem: 'slider__item slider__item_main',
        sliderNextBtn: 'slider__nextBtn slider__nextBtn_main',
        sliderPrevBtn: 'slider__prevBtn slider__prevBtn_main',
        sliderItemImgWrapper: '',
      }}
    />
  );
};

export default MainSlider;