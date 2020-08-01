import React from 'react';
import SwitchBuyBtn from '../../SwitchBuyBtn';
import RatingInMedal from '../../Rating/RatingInMedal';
import '../CommodityPreviewCard.scss';
import { createValidImgSrc, scrollToTop } from '../../../utils/workWithBrowser';
import { switchVisible } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRubleSign } from '@fortawesome/free-solid-svg-icons';
import { createTextWithBr } from '../../../utils/workWithReactElements';
import { Link } from 'react-router-dom';

const CommodityPreviewCard = ({
  data: {
    id,
    previewImg: { previewImgSrc, previewImgAlt },
    shortDescr,
    price,
    title,
    author,
    rating,
  },
}) => {
  return (
    <div className='col-lg-3' style={{ padding: '0 8px' }}>
      <div className='preview'>
        <div
          className='preview__content'
          onMouseEnter={(e) => switchVisible(e, 'show')}
          onMouseLeave={(e) => switchVisible(e, 'close')}
        >
          <div className='preview__content-rating preview__content-rating_small'>
            <RatingInMedal rating={rating.general} />
          </div>
          <div className='preview__content-img_small flexWrap_center'>
            <img src={createValidImgSrc(previewImgSrc)} alt={previewImgAlt} />
          </div>
          <div className='preview__content-moreInfo hidenElem'>
            <div>{title}</div>
            <div>{author}</div>
            <div>{createTextWithBr(shortDescr, 40)}</div>
            <Link to={`/Goods/commodity-${id}`} onClick={() => scrollToTop()}>
              Читать подробнее
            </Link>
          </div>
        </div>
        <div className='preview__detail preview__detail_small flexWrap_SB'>
          <div className='flexWrap_center'>
            <p>{price}</p>
            <FontAwesomeIcon icon={faRubleSign} />
          </div>
          <SwitchBuyBtn id={id} />
        </div>
      </div>
    </div>
  );
};

export default CommodityPreviewCard;
