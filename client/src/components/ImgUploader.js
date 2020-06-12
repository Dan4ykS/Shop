import React, { useState } from 'react';
import FileUploader from './FileUploader';
import '../styles/scss/ImgUploader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { actionsForUpdateImgCopm } from '../utils/workWithBrowser';
import UpdateImg from './UpdateImg';

const ImgUploader = ({ imgSrc, actionForUpload, extraClass = '' }) => {
  if (imgSrc) {
    return (
      <>
        <div className={`imgUploader ${extraClass}`}>
          <img className='imgUploader__img' src={`/${imgSrc}`} alt={imgSrc} />
          <div className='imgUploader__editing'>
            <FontAwesomeIcon onClick={() => actionsForUpdateImgCopm()} icon={faPen} />
          </div>
        </div>
        <div className='modalWraper hidenElem' data-close={true}>
          <UpdateImg imgSrc={imgSrc}/>
        </div>
      </>
    );
  }
  return <FileUploader action={actionForUpload} />;
};

export default ImgUploader;
