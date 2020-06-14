import { redirectToPage } from '../utils/workWithBrowser';

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
