import {
  FETCH_GOODS_REQUEST,
  FETCH_GOODS_SUCCUESS,
  FETCH_GOODS_FAILURE,
  UPDATE_GOODS_REQUEST,
  UPDATE_GOODS_SUCCUESS,
} from '../actions/types';

const updateGoodsList = (state, action) => {
  if (state === undefined) {
    return {
      goods: [],
      loading: true,
      error: null,
      updateGoods: null,
    };
  }

  switch (action.type) {
    case FETCH_GOODS_REQUEST:
      return {
        ...state.goodsList,
        goods: [],
        error: null,
        loading: true,
      };

    case FETCH_GOODS_SUCCUESS:
      return {
        ...state.goodsList,
        goods: action.payload,
        error: null,
        loading: false,
      };

    case UPDATE_GOODS_REQUEST:
      return {
        ...state.goodsList,
        updateGoods: true,
      };

    case UPDATE_GOODS_SUCCUESS:
      return {
        ...state.goodsList,
        goods: [...state.goodsList.goods, ...action.payload],
        updateGoods: false,
      };

    case FETCH_GOODS_FAILURE:
      return {
        ...state.goodsList,
        goods: [],
        error: true,
        loading: false,
      };

    default:
      return state.goodsList;
  }
};

export default updateGoodsList;
