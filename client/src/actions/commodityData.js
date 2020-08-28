import GoodsService from '../services/GoodsService';
import { createAction } from '../utils/workWithRedux';
import {
  UPDATE_IMG,
  UPDATE_PREVIEWIMG,
  UPDATE_TITLE,
  UPDATE_PRICE,
  UPDATE_DESCR,
  UPDATE_SHORTDESCR,
  RESET_COMMODITY_DATA,
  FETCH_COMMODITY_SUCCUESS,
  FETCH_COMMODITY_FAILURE,
  FETCH_COMMODITY_REQUEST,
  GET_SIMILAR_GOODS,
  UPDATE_USER_REVIEW,
  UPDATE_REVIEWS,
  REMOVE_REVIEW,
  CLEAR_USER_REVIEW,
  UPDATE_RATING,
  UPDATE_AUTHOR,
  UPDATE_GENRES,
  UPDATE_TAGS,
} from './types';

export const updateImg = (imgFile, imgSrc, imgAlt) => createAction(UPDATE_IMG, { imgFile, imgSrc, imgAlt });

export const updatePreviewImg = (previewImgFile, previewImgSrc, previewImgAlt) =>
  createAction(UPDATE_PREVIEWIMG, { previewImgFile, previewImgSrc, previewImgAlt });

export const updateTitle = (title) => createAction(UPDATE_TITLE, title);

export const updatePrice = (price) => createAction(UPDATE_PRICE, price);

export const updateDescr = (descr) => createAction(UPDATE_DESCR, descr);

export const updateAuthor = (author) => createAction(UPDATE_AUTHOR, author);

export const updateGenres = (genre) => createAction(UPDATE_GENRES, genre);

export const updateTags = (tag) => createAction(UPDATE_TAGS, tag);

export const updateUserReview = (data) => createAction(UPDATE_USER_REVIEW, data);

export const clearUserReview = () => createAction(CLEAR_USER_REVIEW);

export const updateShortDescr = (shortDescr) => createAction(UPDATE_SHORTDESCR, shortDescr);

export const reloadCommodityData = () => createAction(RESET_COMMODITY_DATA);

export const updateReviews = (newReview) => createAction(UPDATE_REVIEWS, newReview);

export const updateRating = (newRating, oldRating = null) => createAction(UPDATE_RATING, { newRating, oldRating });

export const removeReview = (reviewForRemove) => createAction(REMOVE_REVIEW, reviewForRemove);

const fetchCommoditySuccuess = (data) => createAction(FETCH_COMMODITY_SUCCUESS, data);

const fetchCommodityFailure = () => createAction(FETCH_COMMODITY_FAILURE);

const fetchCommodityRequest = () => createAction(FETCH_COMMODITY_REQUEST);

const getSimilarGoods = (similarGoods) => createAction(GET_SIMILAR_GOODS, similarGoods);

export const fetchCommodity = (id) => async (dispatch) => {
  try {
    dispatch(fetchCommodityRequest());
    const data = await GoodsService.getCommodity(id);
    dispatch(fetchCommoditySuccuess(data));
  } catch (error) {
    dispatch(fetchCommodityFailure());
  }
};

export const fetchSimilarGoods = (id) => async (dispatch) => {
  try {
    const data = await GoodsService.getSimilarGoods(id);
    dispatch(getSimilarGoods(data));
  } catch (error) {
    console.log(error);
  }
};

export const findUserReview = (userName, reviews) => (dispatch) => {
  const reviewData = reviews.find((review) => review.reviewer === userName),
    dataForUserReview = {
      review: reviewData?.review,
      rating: reviewData?.reviewRating,
      reviewId: reviewData?.reviewId,
    };

  if (reviewData) {
    dispatch(updateUserReview(dataForUserReview));
  }
};
