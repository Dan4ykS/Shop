import React from 'react';

const CreateUpdateImgBtn = ({ updateFunc, dataForUpdate: { img, imgSrc, oldImgSrc, newAlt, oldAlt } }) => {
  if ((img && imgSrc !== oldImgSrc && newAlt !== '') || (newAlt.trim() !== oldAlt && newAlt.trim())) {
    return (
      <button
        className='btn btn-success'
        onClick={(e) => {
          e.preventDefault();
          updateFunc(img, imgSrc, newAlt);
        }}
        data-close={true}
      >
        Обновить изображение
      </button>
    );
  }
  return null;
};

export default CreateUpdateImgBtn;
