const fetchGoodsRequest = () => {
  return {
    type: 'FETCH_GOODS_REQUEST',
  };
};

export const fetchGoodsSuccuess = (newBooks) => {
  return {
    type: 'FETCH_GOODS_SUCCUESS',
    payload: newBooks,
  };
};

const fetchGoodsFailure = (error) => {
  return {
    type: 'FETCH_GOODS_FAILURE',
    payload: error,
  };
};

export const fetchGoods = (dispatch, { goodsService }) => async () => {
  try {
    dispatch(fetchGoodsRequest());
    const data = await goodsService.getGoods();
    dispatch(fetchGoodsSuccuess(data))
  } catch (error) {
    dispatch(fetchGoodsFailure(error))
  } 
};

