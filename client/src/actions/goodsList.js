const fetchGoodsRequest = () => {
  return {
    type: 'FETCH_GOODS_REQUEST',
  };
};

const resetLoading = () => {
  return {
    type: 'RESET_LOADING',
  };
};

export const fetchGoodsSuccuess = (goods) => {
  return {
    type: 'FETCH_GOODS_SUCCUESS',
    payload: goods.map((commodity) => ({
      ...commodity,
      id: commodity._id,
    })),
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
    dispatch(fetchGoodsSuccuess(data));
    // dispatch(resetLoading());
  } catch (error) {
    dispatch(fetchGoodsFailure(error));
  }
};
