import { createAction } from '../utils/workWithRedux';

const fetchGoodsRequest = () => createAction('FETCH_GOODS_REQUEST');

const fetchGoodsFailure = () => createAction('FETCH_GOODS_FAILURE');

export const fetchGoodsSuccuess = (goods) => createAction('FETCH_GOODS_SUCCUESS', goods);

export const fetchGoods = (dispatch, { goodsService }) => async () => {
  try {
    dispatch(fetchGoodsRequest());
    const data = await goodsService.getGoods();
    dispatch(fetchGoodsSuccuess(data));
  } catch (error) {
    dispatch(fetchGoodsFailure(error));
  }
};
