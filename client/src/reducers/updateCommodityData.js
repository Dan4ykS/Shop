const updateImgData = (newData, oldData, type) => { 
  console.log(newData)
  return {
    [`${type}File`]: !newData[`${type}File`] ? oldData[`${type}File`] : newData[`${type}File`],
    [`${type}Src`]: !newData[`${type}Src`] ? oldData[`${type}Src`] : newData[`${type}Src`],
    [`${type}Alt`]: !newData[`${type}Alt`] ? oldData[`${type}Alt`] : newData[`${type}Alt`],
    [`${type}Id`]: oldData[`${type}Id`],
  };
}

const updateCommodityData = (state, action) => {
  if (state === undefined) {
    return {
      id: null,
      title: null,
      shortDescr: null,
      descr: null,
      previewImg: null,
      img: null,
      price: null,
      loading: true,
      error: null,
    };
  }
  switch (action.type) {
    case 'FETCH_COMMODITY_REQUEST':
      return {
        ...state.commodityData,
        loading: true,
      };

    case 'FETCH_COMMODITY_SUCCUESS':
      return {
        ...action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_COMMODITY_FAILURE':
      return {
        error: true,
        loading: false,
        id: null,
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
        img: updateImgData(action.payload, state.commodityData.img, 'img'),
      };

    case 'UPDATE_PREVIEWIMG':
      return {
        ...state.commodityData,
        previewImg: updateImgData(action.payload, state.commodityData.previewImg, 'previewImg'),
      };

    default:
      return state.commodityData;
  }
};

export default updateCommodityData;
