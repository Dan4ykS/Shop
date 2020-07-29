import React from 'react';
import SwitchBuyBtn from './SwitchBuyBtn';
import RenderGenresData from '../RenderGenresData';
import RatingInMedal from '../Rating/RatingInMedal';
import './CommodityPreviewCard.scss';
import { createValidImgSrc, scrollToTop } from '../../utils/workWithBrowser';
import { createTextWithBr } from '../../utils/workWithReactElements';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRubleSign } from '@fortawesome/free-solid-svg-icons';

const CommodityPreviewCard = ({
  data: {
    id,
    previewImg: { previewImgSrc, previewImgAlt },
    shortDescr,
    price,
    title,
    genres,
    author,
    rating,
  },
}) => {
  return (
    <div className='col-lg-6' style={{ padding: '0 8px' }}>
      <div className='preview'>
        <div className='preview__content flexWrap'>
          <div className='preview__content-rating'>
            <RatingInMedal rating={rating.general} />
          </div>
          <div className='preview__content-img flexWrap_center'>
            <img src={createValidImgSrc(previewImgSrc)} alt={previewImgAlt} />
          </div>
          <div className='preview__content-info'>
            <div>{title}</div>
            <div>
              <RenderGenresData genres={genres} />
            </div>
            <div>Автор: {author}</div>
            <div>{createTextWithBr(shortDescr, window.innerWidth > 575 ? 300 : 150)}</div>
          </div>
        </div>
        <div className='preview__detail flexWrap'>
          <div className='preview__detail-more'>
            <Link className='btn' to={`/Goods/commodity-${id}`} onClick={() => scrollToTop()}>
              Читать подробнее
            </Link>
          </div>
          <div className='preview__detail-buy flexWrap'>
            <div className='flexWrap_center'>
              <p>{price}</p>
              <FontAwesomeIcon icon={faRubleSign} />
            </div>
            <SwitchBuyBtn id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommodityPreviewCard;
