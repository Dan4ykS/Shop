import React from 'react';
import ListView from '../ListView';
import './Slider.scss';
import './aditionalStyles.scss';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faStar, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { redirectToSlideLink } from './utils';
import { createValidImgSrc } from '../../utils/workWithBrowser';

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
  mode,
  classNames,
}) => {
  return (
    <div className={classNames.slider ?? 'slider'}>
      <div className='slider__wrapper'>
        <div className='slider__track' style={{ transform: `translateX(${position}%)` }}>
          <ListView
            listForRender={content}
            ComponentForRender={({ data: { slideImgSrc, slideLink, elIndex, slideDetail = null } }) => (
              <div className={classNames.sliderItem ?? 'slider__item flexWrapColumn_center'} style={{ minWidth: `${slideWidth}%` }}>
                <div className={classNames.sliderItemImgWrapper ?? 'slider__item-imgWrapper'}>
                  <img src={createValidImgSrc(slideImgSrc)} alt={`slide${elIndex + 1}`} />
                  {slideLink && !slideDetail ? (
                    <button
                      className={classNames.slideBtn ?? 'btn btn-slide'}
                      onClick={() => redirectToSlideLink(slideLink, history)}
                    >
                      Смотреть подробнее
                    </button>
                  ) : null}
                </div>
                {slideDetail ? (
                  <div className='slider__item-moreInfo flexWrap'>
                    <div>
                      <FontAwesomeIcon icon={faStar} /> {slideDetail.rating}
                    </div>
                    <FontAwesomeIcon
                      className='more'
                      icon={faBookOpen}
                      onClick={() => redirectToSlideLink(slideLink, history)}
                    />
                  </div>
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
