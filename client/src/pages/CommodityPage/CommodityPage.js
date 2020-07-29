import React from 'react';
import LoadingData from '../../components/LoadingData';
import RenderGenresData from '../../components/RenderGenresData';
import Rating from '../../components/Rating/Rating';
import './CommodityPage.scss';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchCommodity } from '../../actions/commodityData';
import { createValidImgSrc } from '../../utils/workWithBrowser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentAlt, faRubleSign, faTimes } from '@fortawesome/free-solid-svg-icons';
import { createTextWithBr } from '../../utils/workWithReactElements';
import {
  toggleMoreRatingInfo,
  hideMoreRatingInfo,
  calculateNumberOfRating,
  renderStars,
  calculateRatingPercentage,
} from './utils';

const CommodityPage = ({
  commodityData: { loading, error, title, author, rating, descr, img, reviews, price, genres, countReviews, id },
  actions: { fetchCommodity },
  history,
  match,
}) => {
  return (
    <div className='commodityPage'>
      <LoadingData
        configData={{
          loading,
          error,
          funcForRender: () => fetchCommodity(match.params.id),
          routeForRedirect: '/',
        }}
      >
        <div className='commodityPage__info row'>
          <div className='commodityPage__info-img col-5' onMouseEnter={() => hideMoreRatingInfo()}>
            <img src={createValidImgSrc(img?.imgSrc)} alt={img?.imgAlt} />
          </div>
          <div className='commodityPage__info-detail col-7'>
            <div className='commodityPage__info-detail-item'>
              <div className='item'>
                <div className='item__title'>{title}</div>
                <div className='item__genres'>
                  <RenderGenresData genres={genres} />
                </div>
                <div onMouseEnter={() => hideMoreRatingInfo()} className='item__author'>
                  Автор: {author}
                </div>
              </div>
              <div className='item item__feedback flexWrap'>
                <div className='item__feedback-stars' onMouseEnter={(e) => toggleMoreRatingInfo(e, 'show')}>
                  <FontAwesomeIcon icon={faStar} /> {rating.general}
                </div>
                <div className='item__feedback-reviews' onMouseEnter={(e) => toggleMoreRatingInfo(e, 'hide')}>
                  <FontAwesomeIcon icon={faCommentAlt} /> {countReviews}
                </div>
                <div className='item__feedback-moreRatingInfo hidenElem' onMouseLeave={(e) => hideMoreRatingInfo(e)}>
                  <div className='moreRatingInfo__header'>
                    <div>Рэйтинг читателей WebBook</div>
                    <span className='close' onClick={(e) => hideMoreRatingInfo(e)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                  <div className='moreRatingInfo__content'>
                    <div className='moreRatingInfo__content-general flexWrap_SB'>
                      <span>{rating.general}</span>
                      <div>Оценок товара: {calculateNumberOfRating(rating)}</div>
                    </div>
                    <div className='moreRatingInfo__content-detail'>
                      <div className='moreRatingInfo__content-ratingContainer flexWrap'>
                        <div className='stars flexWrap_FE'>{renderStars(5)}</div>
                        <div className='ratingBar'>
                          <div style={{ width: `${calculateRatingPercentage(rating, 5)}%` }}></div>
                        </div>
                        <div className='ratingCount'>{rating.fiveStars}</div>
                      </div>
                      <div className='moreRatingInfo__content-ratingContainer flexWrap'>
                        <div className='stars flexWrap_FE'>{renderStars(4)}</div>
                        <div className='ratingBar'>
                          <div style={{ width: `${calculateRatingPercentage(rating, 4)}%` }}></div>
                        </div>
                        <div className='ratingCount'>{rating.fourStars}</div>
                      </div>
                      <div className='moreRatingInfo__content-ratingContainer flexWrap'>
                        <div className='stars flexWrap_FE'>{renderStars(3)}</div>
                        <div className='ratingBar'>
                          <div style={{ width: `${calculateRatingPercentage(rating, 3)}%` }}></div>
                        </div>
                        <div className='ratingCount'>{rating.threeStars}</div>
                      </div>
                      <div className='moreRatingInfo__content-ratingContainer flexWrap'>
                        <div className='stars flexWrap_FE'>{renderStars(2)}</div>
                        <div className='ratingBar'>
                          <div style={{ width: `${calculateRatingPercentage(rating, 2)}%` }}></div>
                        </div>
                        <div className='ratingCount'>{rating.twoStars}</div>
                      </div>
                      <div className='moreRatingInfo__content-ratingContainer flexWrap'>
                        <div className='stars flexWrap_FE'>{renderStars(1)}</div>
                        <div className='ratingBar'>
                          <div style={{ width: `${calculateRatingPercentage(rating, 1)}%` }}></div>
                        </div>
                        <div className='ratingCount'>{rating.oneStar}</div>
                      </div>
                    </div>
                  </div>
                  <div className='moreRatingInfo__rating'>
                    <div className='flexWrap'>
                      <div>Оцените книгу:</div>
                      <div>
                        <Rating />
                      </div>
                    </div>
                    <button className='btn'>Написать отзыв</button>
                  </div>
                </div>
              </div>
              <div className='item item__buy flexWrap_SB'>
                <div>
                  {price} <FontAwesomeIcon size='sm' icon={faRubleSign} />
                </div>
                <button className='btn'>Купить</button>
              </div>
            </div>
            <div className='commodityPage__info-detail-item'>{createTextWithBr(descr)}</div>
          </div>
        </div>
        <div className='commodityPage__similarGoods'>
          
        </div>
        <div className='commodityPage__reviews'></div>
        <div className='commodityPage__feedback'></div>
      </LoadingData>
    </div>
  );
};

export default connectToStore(['commodityData'], { fetchCommodity })(CommodityPage, true);
