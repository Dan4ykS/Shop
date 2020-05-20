export const updateImg = (img, imgSrc) => {
  return {
    type: 'UPDATE_IMG',
    payload: { img, imgSrc },
  };
};

export const updatePreviewImg = (previewImg, previewImgSrc) => { 
  return {
    type: 'UPDATE_PREVIWIMG',
    payload: {previewImg, previewImgSrc}
  };
}

