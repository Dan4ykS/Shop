import GoodsService from '../services/GoodsService';
import { createAction } from '../utils/workWithRedux';
import {
  FETCH_GOODS_REQUEST,
  FETCH_GOODS_FAILURE,
  FETCH_GOODS_SUCCUESS,
  UPDATE_GOODS_REQUEST,
  UPDATE_GOODS_SUCCUESS,
} from './types';

const fetchGoodsRequest = () => createAction(FETCH_GOODS_REQUEST);

const fetchGoodsFailure = () => createAction(FETCH_GOODS_FAILURE);

const updateGoodsRequest = () => createAction(UPDATE_GOODS_REQUEST);

const updateGoodsSuccuess = (goods) => createAction(UPDATE_GOODS_SUCCUESS, goods);

export const fetchGoodsSuccuess = (goods) => createAction(FETCH_GOODS_SUCCUESS, goods);

const getDataFromServer = async ({ type = 'default', strForSearch, offset = 0, limit = 8 }) => {
  switch (type) {
    case 'popularGoods':
      return await GoodsService.getPopularGoods(offset, limit);

    case 'search':
      return await GoodsService.findGoods(strForSearch, offset, limit);

    case 'newGoods':
      return await GoodsService.getNewGoods(offset, limit);

    case 'bestGoods':
      return await GoodsService.getBestGoods(offset, limit);

    default:
      return await GoodsService.getGoods(offset, limit);
  }
};

export const fetchGoods = (configData) => async (dispatch) => {
  try {
    dispatch(fetchGoodsRequest());
    const data = await getDataFromServer(configData);
    dispatch(fetchGoodsSuccuess(data));
  } catch (error) {
    dispatch(fetchGoodsFailure());
  }
};

export const loadMoreGoods = (configData) => async (dispatch) => {
  try {
    dispatch(updateGoodsRequest());
    const newGoods = await getDataFromServer(configData);
    dispatch(updateGoodsSuccuess(newGoods));
    return newGoods.length;
  } catch (error) {
    dispatch(fetchGoodsFailure());
  }
};

// export const searchGoods = (queryForSearch, offset = 0, limit = 8) => async (dispatch) => {
//   try {
//     dispatch(fetchGoodsRequest());
//     const data = await GoodsService.findGoods(queryForSearch, offset, limit);
//     dispatch(fetchGoodsSuccuess(data));
//   } catch (error) {
//     dispatch(fetchGoodsFailure());
//   }
// };

// export const fetchPopularGoods = (offset = 0, limit = 8) => async (dispatch) => {
//   try {
//     dispatch(fetchGoodsRequest());
//     const data = await GoodsService.getPopularGoods(offset, limit);
//     dispatch(fetchGoodsSuccuess(data));
//   } catch (error) {
//     dispatch(fetchGoodsFailure());
//   }
// };

// export const fetchNewGoods = (offset = 0, limit = 8) => async (dispatch) => {
//   try {
//     dispatch(fetchGoodsRequest());
//     const data = await GoodsService.getNewGoods(offset, limit);
//     dispatch(fetchGoodsSuccuess(data));
//   } catch (error) {
//     dispatch(fetchGoodsFailure());
//   }
// };

// export const fetchBestGoods = (offset, limit) => async (dispatch) => {
//   try {
//     dispatch(fetchGoodsRequest());
//     const data = await GoodsService.getBestGoods(offset, limit);
//     dispatch(fetchGoodsSuccuess(data));
//   } catch (error) {
//     dispatch(fetchGoodsFailure());
//   }
// };
