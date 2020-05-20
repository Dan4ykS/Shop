const updateCommodityData = (state, action) => {
  if (state === undefined) {
    return {
      loading: true,
      title: null,
      shortDescr: null,
      descr: null,
      previewImgSrc: null,
      previewImg: null,
      imgSrc: null,
      img: null,
      price: null,
    };
  }
  switch (action.type) {
    case 'UPDATE_IMG':
      return {
        ...state.commodityData,
        img: action.payload.img,
        imgSrc: action.payload.imgSrc,
      };
    case 'UPDATE_PREVIWIMG':
      return {
        ...state.commodityData,
        previewImg: action.payload.img,
        previewImgSrc: action.payload.imgSrc,
      };
    default:
      return state.commodityData;
  }
};

export default updateCommodityData;
