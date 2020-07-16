import { createAction } from '../utils/workWithRedux';
import GoodsService from '../services/GoodsService';

export const updateImg = (imgFile, imgSrc, imgAlt) => createAction('UPDATE_IMG', { imgFile, imgSrc, imgAlt });

export const updatePreviewImg = (previewImgFile, previewImgSrc, previewImgAlt) =>
  createAction('UPDATE_PREVIEWIMG', { previewImgFile, previewImgSrc, previewImgAlt });

export const updateTitle = (title) => createAction('UPDATE_TITLE', title);

export const updatePrice = (price) => createAction('UPDATE_PRICE', price);

export const updateDescr = (descr) => createAction('UPDATE_DESCR', descr);

export const updateShortDescr = (shortDescr) => createAction('UPDATE_SHORTDESCR', shortDescr);

export const reloadCommodityData = () => createAction('RESET_COMMODITY_DATA');

const fetchCommoditySuccuess = (data) => createAction('FETCH_COMMODITY_SUCCUESS', data);

const fetchCommodityFailure = () => createAction('FETCH_COMMODITY_FAILURE');

const fetchCommodityRequest = () => createAction('FETCH_COMMODITY_REQUEST');

export const fetchCommodity = (id) => async (dispatch) => {
  try {
    dispatch(fetchCommodityRequest());
    const data = await GoodsService.getCommodity(id);
    dispatch(fetchCommoditySuccuess(data));
  } catch (error) {
    dispatch(fetchCommodityFailure());
  }
};
