import React, { useEffect } from 'react';
import LoadingData from '../../components/LoadingData';
import RenderGenresData from '../../components/RenderGenresData';
import Rating from '../../components/Rating/Rating';
import SimilarGoods from './SimilarGoods';
import Reviews from './Reviews';
import Feedback from './Feedback/Feedback';
import SwitchBuyBtn from '../../components/SwitchBuyBtn';
import TextWithBr from '../../components/TextWithBr/TextWithBr';
import './CommodityPage.scss';
import { connectToStore } from '../../utils/workWithRedux';
import { updateUserReviews } from '../../actions/userData';
import { createValidImgSrc, scrollToElem, STORE_NAME } from '../../utils/workWithBrowser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentAlt, faRubleSign } from '@fortawesome/free-solid-svg-icons';
import { ReactTitle } from 'react-meta-tags';
import {
  fetchCommodity,
  fetchSimilarGoods,
  updateUserReview,
  updateReviews,
  updateRating,
} from '../../actions/commodityData';
import {
  toggleMoreRatingInfo,
  hideMoreRatingInfo,
  calculateNumberOfRating,
  renderStars,
  calculateRatingPercentage,
  writeReview,
  initPage,
} from './utils';

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
    userReview,
  },
  userData: { userName },
  actions: { fetchCommodity, fetchSimilarGoods, updateUserReview, updateReviews, updateRating, updateUserReviews },
  match,
}) => {
  useEffect(() => {
    const commodityId = match.params.id;
    initPage(commodityId, fetchCommodity, fetchSimilarGoods);
  }, [match.params.id, fetchCommodity, fetchSimilarGoods]);

  return (
    <div className='commodityPage'>
      <ReactTitle title={`${STORE_NAME} | Книга: "${title}"`} />
      <LoadingData
        configData={{
          loading,
          error,
          funcForRender: null,
          routeForRedirect: '/',
        }}
      >
        <div className='commodityPage__info row justify-content-center'>
          <div className='commodityPage__info-img col-lg-5 col-8' onMouseEnter={() => hideMoreRatingInfo()}>
            <img src={createValidImgSrc(img?.imgSrc)} alt={img?.imgAlt ?? 'img'} />
          </div>
          <div className='commodityPage__info-detail col-lg-7'>
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
                  <FontAwesomeIcon icon={faStar} /> {userReview?.rating ? userReview.rating : rating.general}
                </div>
                <div
                  className='item__feedback-reviews'
                  onMouseEnter={(e) => toggleMoreRatingInfo(e, 'hide')}
                  onClick={() => (countReviews ? scrollToElem('commodityPage__reviews') : null)}
                >
                  <FontAwesomeIcon icon={faCommentAlt} /> {countReviews}
                </div>
                <div className='item__feedback-moreRatingInfo hiddenElem' onMouseLeave={(e) => hideMoreRatingInfo(e)}>
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
                        <Rating
                          userRating={userReview ? userReview.rating : 0}
                          commodityData={{ id: id ?? null, userReview: userReview ?? null }}
                          funcsForUpdate={{
                            updateUserReview,
                            updateReviews,
                            updateRating,
                            updateUserReviews,
                          }}
                        />
                      </div>
                    </div>
                    <button className='btn' onClick={() => writeReview(userName)}>
                      {userReview?.review ? 'Редактировать отзыв' : 'Написать отзыв'}
                    </button>
                  </div>
                </div>
              </div>
              <div className='item item__buy flexWrap_SB'>
                <div>
                  {price} <FontAwesomeIcon size='sm' icon={faRubleSign} />
                </div>
                <SwitchBuyBtn id={id} />
              </div>
            </div>
            <div className='commodityPage__info-detail-item'>
              <TextWithBr text={descr} maxlength={1000} needReadMore={true} />
            </div>
          </div>
        </div>
        <div className='commodityPage__similarGoods'>
          <SimilarGoods goods={similarGoods} />
        </div>
        <div className='commodityPage__reviews'>
          <Reviews reviews={reviews.filter(({ review }) => review)} />
        </div>
        <Feedback />
      </LoadingData>
    </div>
  );
};

export default connectToStore(['commodityData', 'userData'], {
  fetchCommodity,
  fetchSimilarGoods,
  updateUserReview,
  updateReviews,
  updateRating,
  updateUserReviews,
})(CommodityPage);
