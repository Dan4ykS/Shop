const updategoodsList = (state, action) => {
  if (state === undefined) {
    return {
      goods: [],
      loading: null,
      error: null,
    };
  }
  switch (action.type) {
    case 'FETCH_GOODS_REQUEST':
      return {
        goods: [],
        error: null,
        loading: true,
      };
    case 'FETCH_GOODS_SUCCUESS':
      return {
        goods: action.payload,
        error: null,
        loading: false,
      };
    case 'FETCH_GOODS_FAILURE':
      return {
        goods: [],
        error: action.payload,
        loading: false,
      };
    case 'RESET_LOADING':
      return {
        ...state.goodsList,
        loading: true,
      };
    default:
      return state.goodsList;
  }
};

export default updategoodsList;
