const updateImg = (img, imgSrc) => {
  return {
    type: 'UPDATE_IMG',
    payload: { img, imgSrc },
  };
};

export const updateDataAboutCommodityImg = (dispatch) => (img, imgSrc) => {
  dispatch(updateImg(img, imgSrc))
};
