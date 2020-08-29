import React from 'react';
import SwitchBuyBtn from '../SwitchBuyBtn';
import RenderGenresData from '../RenderGenresData';
import RatingInMedal from '../Rating/RatingInMedal';
import TextWithBr from '../TextWithBr/TextWithBr';
import './CommodityPreviewCard.scss';
import { createValidImgSrc, scrollToTop } from '../../utils/workWithBrowser';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRubleSign } from '@fortawesome/free-solid-svg-icons';
import { trimText } from '../TextWithBr/utils';

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
    <div className='previewCard col-lg-6' style={{ padding: '0 8px' }}>
      <div className='preview'>
        <div className={`preview__content ${window.screen.width > 575 ? 'flexWrap' : 'flexWrapColumn'}`}>
          <div className='preview__content-rating'>
            <RatingInMedal rating={rating.general} />
          </div>
          <div className='preview__content-img flexWrap_center'>
            <img src={createValidImgSrc(previewImgSrc)} alt={previewImgAlt} />
          </div>
          <div className='preview__content-info'>
            <div>{trimText(title, window.screen.width > 375 ? null : 35)}</div>
            <div>
              <RenderGenresData genres={genres} />
            </div>
            <div>Автор: {author}</div>
            <div>
              <TextWithBr text={shortDescr} maxlength={200} />
            </div>
          </div>
        </div>
        <div className='preview__detail flexWrap'>
          <div className='preview__detail-more'>
            <Link className='btn' to={`/Goods/commodity-${id}`} onClick={() => scrollToTop()}>
              {window.screen.width > 575 ? 'Читать подробнее' : 'Подробнее'}
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
