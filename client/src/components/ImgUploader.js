import React from 'react';
import FileUploader from './FileUploader';
import '../styles/scss/ImgUploader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { actionsForUpdateImgCopm } from '../utils/workWithBrowser';
import UpdateImg from './UpdateImg';

const ImgUploader = ({ img, actionForUpload, extraClass = '' }) => {
  if (img.src) {
    return (
      <>
        <div className={`imgUploader flexWrap ${extraClass}`}>
          <img className='imgUploader__img' src={`/${img.src}`} alt={img.alt} />
          <div className='imgUploader__editing'>
            <FontAwesomeIcon onClick={() => actionsForUpdateImgCopm(img.id)} icon={faPen} />
          </div>
        </div>
        <UpdateImg img={img} />
      </>
    );
  }
  return <FileUploader action={actionForUpload} />;
};

export default ImgUploader;
