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
} from './types';

export const updateImg = (imgFile, imgSrc, imgAlt) => createAction(UPDATE_IMG, { imgFile, imgSrc, imgAlt });

export const updatePreviewImg = (previewImgFile, previewImgSrc, previewImgAlt) =>
  createAction(UPDATE_PREVIEWIMG, { previewImgFile, previewImgSrc, previewImgAlt });

export const updateTitle = (title) => createAction(UPDATE_TITLE, title);

export const updatePrice = (price) => createAction(UPDATE_PRICE, price);

export const updateDescr = (descr) => createAction(UPDATE_DESCR, descr);

export const updateShortDescr = (shortDescr) => createAction(UPDATE_SHORTDESCR, shortDescr);

export const reloadCommodityData = () => createAction(RESET_COMMODITY_DATA);

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
