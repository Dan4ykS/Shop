import { redirectToPage } from '../utils/workWithBrowser';

export const updateImg = (img, imgSrc) => {
  return {
    type: 'UPDATE_IMG',
    payload: { img, imgSrc },
  };
};

export const updatePreviewImg = (previewImg, previewImgSrc) => {
  return {
    type: 'UPDATE_PREVIWIMG',
    payload: { previewImg, previewImgSrc },
  };
};

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
    console.log(error);
    redirectToPage(history, `/admin/updateCommodity?id=${id}`);
  }
};
