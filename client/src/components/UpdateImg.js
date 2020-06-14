import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import '../styles/scss/UpdateImg.scss';
import { createUpdateImgBtn } from '../utils/workWithCreateReactElem';
import { findNeedElement } from '../utils/workWithBrowser';

const UpdateImg = ({ img: { src, id, alt }, updateImgData }) => {
  const [previewSrc, updatePreviewSrc] = useState(null),
    [img, updateLocalImg] = useState(null);
  return (
    <div className={`updateImg updateImg_${id} hidenElem row`}>
      <span data-close={true}>&#215;</span>
      <div className='updateImg__fileUploader flexWrapColumn_center col-4'>
        <FileUploader
          action={(file, src) => {
            updatePreviewSrc(src);
            // console.log(file);
            updateLocalImg(file);
            // const values = JSON.stringify(src)
            // console.log(values)
            // findNeedElement('.modalWraper').setAttribute('data-values', JSON.stringify({ file, src }));
          }}
          text='Загрузить новый файл'
        />
        {previewSrc ? createUpdateImgBtn(updateImgData, img, previewSrc) : null}
      </div>
      <div className='updateImg__preview flexWrap_center col-8'>
        <img src={!previewSrc ? `/${src}` : previewSrc} alt={`img:${alt}`} />
      </div>
    </div>
  );
};

export default UpdateImg;
