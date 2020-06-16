import { redirectToPage } from '../utils/workWithBrowser';

const createActionFunc = (action, payload = null) => {
  return {
    type: action,
    payload,
  };
};

const updateCommodityDataOnServer = () => createActionFunc('UPDATE_COMMODITY_DATA_ON_SERVER');

export const updateImg = (imgFile, imgSrc, imgAlt) => {
  return {
    type: 'UPDATE_IMG',
    payload: { imgFile, imgSrc, imgAlt },
  };
};

export const updatePreviewImg = (previewImgFile, previewImgSrc, previewImgAlt) => {
  return {
    type: 'UPDATE_PREVIEWIMG',
    payload: { previewImgFile, previewImgSrc, previewImgAlt },
  };
};

export const updateTitle = (title) => createActionFunc('UPDATE_TITLE', title);

export const updatePrice = (price) => createActionFunc('UPDATE_PRICE', price);

export const updateDescr = (descr) => createActionFunc('UPDATE_DESCR', descr);

export const updateShortDescr = (shortDescr) => createActionFunc('UPDATE_SHORTDESCR', shortDescr);

export const reloadCommodityData = () => createActionFunc('RELOAD_COMMODITY_DATA');

const fetchCommoditySuccuess = (data) => {
  return {
    type: 'FETCH_COMMODITY_SUCCUESS',
    payload: data,
  };
};

const fetchCommodityFailure = () => {
  return {
    type: 'FETCH_COMMODITY_FAILURE',
  };
};

const fetchCommodityRequest = () => {
  return {
    type: 'FETCH_COMMODITY_REQUEST',
  };
};

export const fetchCommodity = (dispatch, { goodsService }) => async (id, token, history) => {
  try {
    dispatch(fetchCommodityRequest());
    const data = await goodsService.getCommodity(id, token);
    dispatch(fetchCommoditySuccuess(data));
  } catch (error) {
    dispatch(fetchCommodityFailure());
    redirectToPage(history, `/admin/updateCommodity?id=${id}`);
  }
};

export const updateCommodityData = (dispatch, { goodsService }) => async (updatedFields = [], token) => { 
  try {
    updatedFields.forEach((field) => console.log(field))
  } catch (error) {
    console.log(error)
  }
}
