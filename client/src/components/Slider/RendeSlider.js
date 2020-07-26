import React from 'react';
import ListView from '../ListView';
import './Slider.scss';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { redirectToSlideLink } from './utils';

const RendeSlider = ({
  position,
  slideWidth,
  content,
  nextBtnClick,
  prevBtnClick,
  dotClick,
  setDotClass,
  history,
  hasDots,
  classNames
}) => {
  return (
    <div className={classNames.slider ?? 'slider'}>
      <div className={classNames.sliderWrapper ?? 'slider__wrapper'}>
        <div className='slider__track' style={{ transform: `translateX(${position}%)` }}>
          <ListView
            listForRender={content}
            ComponentForRender={({ data: { slideImgSrc, slideLink, elIndex } }) => (
              <div className={classNames.sliderItem ?? 'slider__item'} style={{ minWidth: `${slideWidth}%` }}>
                <img src={slideImgSrc} alt={`slide${elIndex + 1}`} />
                {slideLink ? (
                  <button className='slideBtn' onClick={() => redirectToSlideLink(slideLink, history)}>
                    Смотреть подробнее
                  </button>
                ) : null}
              </div>
            )}
          />
        </div>
      </div>
      {hasDots ? (
        <div className={classNames.sliderDots ?? 'sliderDots flexWrap_center'}>
          <ListView
            listForRender={content}
            ComponentForRender={({ data: { elIndex } }) => (
              <span className={setDotClass(elIndex)} onClick={() => dotClick(elIndex)}></span>
            )}
          />
        </div>
      ) : null}

      <div className={classNames.sliderNextBtn ?? 'slider__nextBtn'}>
        <FontAwesomeIcon icon={faAngleRight} onClick={() => nextBtnClick()} />
      </div>
      <div className={classNames.sliderPrevBtn ?? 'slider__prevBtn'}>
        <FontAwesomeIcon icon={faAngleLeft} onClick={() => prevBtnClick()} />
      </div>
    </div>
  );
};

export default withRouter(RendeSlider);
