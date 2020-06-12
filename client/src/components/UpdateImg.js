import React, { useState } from 'react';
import FileUploader from './FileUploader';
import '../styles/scss/UpdateImg.scss';
import { createUpdateImgBtn } from '../utils/workWithCreateReactElem';
import { findNeedElement } from '../utils/workWithBrowser';

const UpdateImg = ({ imgSrc, updateImgData }) => {
  const [previewSrc, updatePreviewSrc] = useState(null),
    [img, updateLocalImg] = useState(null);
  return (
    <div className='updateImg row'>
      <span data-close={true}>&#215;</span>
      <div className='updateImg__fileUploader flexWrapColumn_center col-4'>
        <FileUploader
          action={(file, imgSrc) => {
            updatePreviewSrc(imgSrc);
            console.log(file);
            updateLocalImg(file);
            const values = JSON.stringify(imgSrc)
            console.log(values)
            findNeedElement('.modalWraper').setAttribute('data-values', JSON.stringify({ file, imgSrc }));
          }}
          text='Загрузить новый файл'
        />
        {previewSrc ? createUpdateImgBtn(updateImgData, img, previewSrc) : null}
      </div>
      <div className='updateImg__preview flexWrap_center col-8'>
        <img src={!previewSrc ? `/${imgSrc}` : previewSrc} alt={previewSrc} />
      </div>
    </div>
  );
};

export default UpdateImg;
