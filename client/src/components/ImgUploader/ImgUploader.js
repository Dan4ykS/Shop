import React from 'react';
import FileUploader from '../FileUploader';
import UpdateImg from './UpdateImg';
import StringHelper from '../../utils/StringHelper';
import './ImgUploader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { actionsForModalWindow, createValidImgSrc } from '../../utils/workWithBrowser';

const ImgUploader = ({ img, actionForUpdateImgData, extraClass = '' }) => {
  if (img.src) {
    return (
      <>
        <div className={`imgUploader flexWrap ${extraClass}`}>
          <img className='imgUploader__img' src={createValidImgSrc(img.src)} alt={img.alt} />
          <div className='imgUploader__editing'>
            <FontAwesomeIcon
              onClick={() => actionsForModalWindow(`.updateImg_${img.id}`)}
              icon={faPen}
            />
          </div>
        </div>
        <UpdateImg img={img} funcForUpdateData={actionForUpdateImgData} />
      </>
    );
  }
  return <FileUploader action={actionForUpdateImgData} id={StringHelper.createId()} />;
};

export default ImgUploader;
