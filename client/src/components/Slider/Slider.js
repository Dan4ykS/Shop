import React, { useState } from 'react';
import RendeSlider from './RendeSlider';

const Slider = ({
  slidesToShow = 1,
  slidesToScroll = 1,
  content,
  classNames = {},
  hasDots = true,
}) => {
  const [position, setPosition] = useState(0),
    slideWidth = 100 / slidesToShow,
    allScrollWidth = slideWidth * content.length,
    movePosition = slidesToScroll * slideWidth;

  const nextBtnClick = () => {
    const slideLeft = Math.round(content.length - (Math.abs(position) + slidesToShow * slideWidth) / slideWidth);
    const newPosition = slideLeft >= slidesToScroll ? position - movePosition : position - slideLeft * slideWidth;
    if (slideLeft === 0) {
      setPosition(0);
    } else {
      setPosition(newPosition);
    }
  };

  const prevBtnClick = () => {
    const slideLeft = Math.round(Math.abs(position) / slideWidth);
    const newPosition = slideLeft >= slidesToScroll ? position + movePosition : position + slideLeft * slideWidth;
    if (slideLeft === 0) {
      const newPosition = position - allScrollWidth + slidesToShow * slideWidth;
      setPosition(newPosition);
    } else {
      setPosition(newPosition);
    }
  };

  const dotClick = (dotIndex) => {
    setPosition(-dotIndex * slideWidth);
  };

  const setDotClass = (dotIndex) => {
    if (Math.abs(position) === dotIndex * slideWidth) {
      return classNames.sliderDotsItemActive ?? 'sliderDots__item sliderDots__item_active';
    } else {
      return classNames.sliderDotsItem ?? 'sliderDots__item';
    }
  };

  return (
    <RendeSlider
      nextBtnClick={nextBtnClick}
      prevBtnClick={prevBtnClick}
      dotClick={dotClick}
      setDotClass={setDotClass}
      slideWidth={slideWidth}
      content={content}
      classNames={classNames}
      hasDots={hasDots}
      position={position}
    />
  );
};

export default Slider;
