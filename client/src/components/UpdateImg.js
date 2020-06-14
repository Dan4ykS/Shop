import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import '../styles/scss/UpdateImg.scss';
import { createUpdateImgBtn } from '../utils/workWithCreateReactElem';
import { findNeedElement } from '../utils/workWithBrowser';

const UpdateImg = ({ img: { src, id, alt }, funcForUpdateData }) => {
  const [previewSrc, updatePreviewSrc] = useState(null),
    [imgAlt, updateImgAlt] = useState(alt),
    [img, updateLocalImg] = useState(null);
  return (
    <div className={`updateImg updateImg_${id} hidenElem row`}>
      <span data-close={true}>&#215;</span>

      <div className='updateImg__imgDetail flexWrapColumn_center col-4'>
        <div className='form-group row'>
          <label className='col-sm-3'>Alt:</label>
          <div className='col-sm-9'>
            <input type='text' className='form-control' value={imgAlt} onChange={(e) => updateImgAlt(e.target.value)} />
          </div>
        </div>
        <FileUploader
          action={(file, src) => {
            updatePreviewSrc(src);
            updateLocalImg(file);
            // const values = JSON.stringify(src)
            // console.log(values)
            // findNeedElement('.modalWraper').setAttribute('data-values', JSON.stringify({ file, src }));
          }}
          id={id}
          text='Загрузить новый файл'
        />
        {previewSrc || alt !== imgAlt ? createUpdateImgBtn(funcForUpdateData, img, previewSrc, alt !== imgAlt ? imgAlt : null) : null}
      </div>
      <div className='updateImg__preview flexWrap_center col-8'>
        <img src={!previewSrc ? `/${src}` : previewSrc} alt={`img:${alt}`} />
      </div>
    </div>
  );
};

export default UpdateImg;
