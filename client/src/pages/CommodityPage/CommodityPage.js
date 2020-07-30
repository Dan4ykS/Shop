import React, { useEffect } from 'react';
import LoadingData from '../../components/LoadingData';
import RenderGenresData from '../../components/RenderGenresData';
import Rating from '../../components/Rating/Rating';
import './CommodityPage.scss';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchCommodity, fetchSimilarGoods } from '../../actions/commodityData';
import { createValidImgSrc, scrollToElem } from '../../utils/workWithBrowser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentAlt, faRubleSign } from '@fortawesome/free-solid-svg-icons';
import { createTextWithBr } from '../../utils/workWithReactElements';
import {
  toggleMoreRatingInfo,
  hideMoreRatingInfo,
  calculateNumberOfRating,
  renderStars,
  calculateRatingPercentage,
} from './utils';
import SimilarGoods from './SimilarGoods';
import ListView from '../../components/ListView';
import Reviews from './Reviews';

const CommodityPage = ({
  commodityData: {
    loading,
    error,
    title,
    author,
    rating,
    descr,
    img,
    reviews,
    price,
    genres,
    countReviews,
    id,
    similarGoods,
  },
  userData: { userName },
  actions: { fetchCommodity, fetchSimilarGoods },
  match,
}) => {
  useEffect(() => {
    const commodityId = match.params.id;
    fetchCommodity(commodityId);
    fetchSimilarGoods(commodityId);
  }, [match.params.id, fetchCommodity, fetchSimilarGoods]);
  return (
    <div className='commodityPage'>
      <LoadingData
        configData={{
          loading,
          error,
          funcForRender: async () => {
            const commodityId = match.params.id;
            await fetchCommodity(commodityId);
            await fetchSimilarGoods(commodityId);
          },
          routeForRedirect: '/',
        }}
      >
        <div className='commodityPage__info row'>
          <div className='commodityPage__info-img col-5' onMouseEnter={() => hideMoreRatingInfo()}>
            <img src={createValidImgSrc(img?.imgSrc)} alt={img?.imgAlt} />
          </div>
          <div className='commodityPage__info-detail col-7'>
            <div className='commodityPage__info-detail-item'>
              <div className='item item__title'>{title}</div>
              <div className='item item__genres'>
                <span>жанры:</span> <RenderGenresData genres={genres} />
              </div>
              <div onMouseEnter={() => hideMoreRatingInfo()} className='item item__author'>
                <span>автор:</span> {author}
              </div>
              <div className='item item__feedback flexWrap'>
                <div className='item__feedback-stars' onMouseEnter={(e) => toggleMoreRatingInfo(e, 'show')}>
                  <FontAwesomeIcon icon={faStar} /> {rating?.general}
                </div>
                <div
                  className='item__feedback-reviews'
                  onMouseEnter={(e) => toggleMoreRatingInfo(e, 'hide')}
                  onClick={() => scrollToElem('commodityPage__reviews')}
                >
                  <FontAwesomeIcon icon={faCommentAlt} /> {countReviews}
                </div>
                <div className='item__feedback-moreRatingInfo hidenElem' onMouseLeave={(e) => hideMoreRatingInfo(e)}>
                  <div className='moreRatingInfo__header'>
                    <div>Рейтинг читателей</div>
                    <span className='close' onClick={(e) => hideMoreRatingInfo(e)}></span>
                  </div>
                  <div className='moreRatingInfo__content'>
                    <div className='moreRatingInfo__content-general flexWrap'>
                      <span>{rating?.general}</span>
                      <div className='flexWrap'>
                        <p>оценок:</p> <p>{calculateNumberOfRating(rating)}</p>
                      </div>
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
                    <div className='moreRatingInfo__rating-detail flexWrap'>
                      <div>Оцените книгу:</div>
                      <div className='stars'>
                        <Rating userRating={2} />
                      </div>
                    </div>
                    <button className='btn' onClick={() => scrollToElem('commodityPage__feedback')}>
                      Написать отзыв
                    </button>
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
          <SimilarGoods goods={similarGoods} />
        </div>
        <div className='commodityPage__reviews'>
          <Reviews reviews={reviews} />
        </div>
        <div className='commodityPage__feedback row'>
          <div className='commodityPage__feedback-title commodityPage__blockTitle col-12'>Оставить отзыв</div>
          <div className='col-2'>
            <div className='userAvatar'>
              <img src={'/static/defaultAvatar.png'} alt={`avatar-${userName}`} />
            </div>
          </div>
          <div className='col-10'>
            <div className='commodityPage__feedback-content'>
              <div className='commodityPage__feedback-content-header flexWrap_SB'>
                <div className='userName'>{userName}</div>
                <div className='userRating flexWrap'>
                  <span>Оцените книгу: </span>
                  <Rating />
                </div>
              </div>
              <textarea
                className='formControl commodityPage__feedback-content-review'
                placeholder='Понравилась книга?'
              />
            </div>
          </div>
          <div className='commodityPage__feedback-btn col-12'>
            <button className='btn'>Опубликовать</button>
          </div>
        </div>
      </LoadingData>
    </div>
  );
};

export default connectToStore(['commodityData', 'userData'], { fetchCommodity, fetchSimilarGoods })(
  CommodityPage,
  true
);
