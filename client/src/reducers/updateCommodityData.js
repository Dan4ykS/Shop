const updateCommodityData = (state, action) => {
  if (state === undefined) {
    return {
      loading: true,
      id: null,
      error: null,
      title: null,
      shortDescr: null,
      descr: null,
      previewImg: null,
      img: null,
      price: null,
    };
  }
  switch (action.type) {
    case 'FETCH_COMMODITY_REQUEST':
      return {
        ...state.commodityData,
        loading: true,
      }

    case 'FETCH_COMMODITY_SUCCUESS':
      return {
        ...state.commodityData,
        ...action.payload,
        loading: false,
      };

    case 'FETCH_COMMODITY_FAILURE':
      return {
        loading: true,
        id: null,
        error: null,
        title: null,
        shortDescr: null,
        descr: null,
        previewImg: null,
        img: null,
        price: null,
      };

    case 'UPDATE_IMG':
      return {
        ...state.commodityData,
        img: {
          ...state.commodityData.img,
          imgFile: action.payload.img,
        },
      };

    case 'UPDATE_PREVIWIMG':
      return {
        ...state.commodityData,
        previewImg: {
          ...state.commodityData.previewImg,
          previewImgFile: action.payload.img,
        },
      };

    default:
      return state.commodityData;
  }
};

export default updateCommodityData;
