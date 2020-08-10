import React, { useState } from 'react';
import FileUploader from '../../FileUploader';
import './UpdateImg.scss';
import { createValidImgSrc, validateInput } from '../../../utils/workWithBrowser';
import CreateUpdateImgBtn from './UpdateImgBtn';

const UpdateImg = ({ img: { src, id, alt }, funcForUpdateData }) => {
  const [previewSrc, updatePreviewSrc] = useState(null),
    [imgAlt, updateImgAlt] = useState(alt),
    [img, updateLocalImg] = useState(null);

  return (
    <div className={`modalWindow updateImg updateImg_${id} row hiddenElem`}>
      <span data-close={true}>&#215;</span>
      <div className='updateImg__imgDetail flexWrapColumn_center col-4'>
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Alt:</label>
          <div className='col-sm-9'>
            <input
              type='text'
              className='formControl'
              value={imgAlt?.trimStart()}
              onChange={(e) => validateInput(e, updateImgAlt)}
            />
            <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
          </div>
        </div>
        <FileUploader
          action={(file, src) => {
            updatePreviewSrc(src);
            updateLocalImg(file);
          }}
          id={id}
          text='Загрузить новый файл'
        />
        <CreateUpdateImgBtn
          updateFunc={funcForUpdateData}
          dataForUpdate={{ img, imgSrc: previewSrc, oldImgSrc: src, newAlt: imgAlt, oldAlt: alt }}
        />
      </div>
      <div className='updateImg__preview flexWrap_center col-8'>
        <img src={!previewSrc ? `${createValidImgSrc(src)}` : createValidImgSrc(previewSrc)} alt={`img:${alt}`} />
      </div>
    </div>
  );
};

export default UpdateImg;
