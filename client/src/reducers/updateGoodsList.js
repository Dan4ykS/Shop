const updategoodsList = (state, action) => {
  if (state === undefined) {
    return {
      goods: [],
      loading: true,
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
    default:
      return state.goodsList;
  }
};

export default updategoodsList;
