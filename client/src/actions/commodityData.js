export const updateImg = (img, imgSrc) => {
  return {
    type: 'UPDATE_IMG',
    payload: { img, imgSrc },
  };
};

