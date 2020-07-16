import { createAction } from '../utils/workWithRedux';
import GoodsService from '../services/GoodsService';

const fetchGoodsRequest = () => createAction('FETCH_GOODS_REQUEST');

const fetchGoodsFailure = () => createAction('FETCH_GOODS_FAILURE');

export const fetchGoodsSuccuess = (goods) => createAction('FETCH_GOODS_SUCCUESS', goods);

export const fetchGoods = (offset, limit) => async (dispatch) => {
  try {
    dispatch(fetchGoodsRequest());
    const data = await GoodsService.getGoods(offset, limit);
    dispatch(fetchGoodsSuccuess(data));
  } catch (error) {
    dispatch(fetchGoodsFailure(error));
  }
};
