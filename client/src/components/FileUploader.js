import React, { useEffect } from 'react';
import '../styles/scss/FileUploader.scss';
import withStore from '../utils/helpFuncsForRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { triggerUploadInput, uploadFile, preventDefaultFaileUpload, removePreventDefault, dragAndDropForFile } from '../utils/helpFuncsForBrouser';

const FileUploader = ({ actions: { updateDataAboutCommodityImg } }) => {
  useEffect(() => {
    preventDefaultFaileUpload();
    dragAndDropForFile(updateDataAboutCommodityImg);
    return () => {
      removePreventDefault();
    };
  }, [updateDataAboutCommodityImg]);
  return (
    <div className='fileUploader'>
      <input
        type='file'
        name='uploader'
        onChange={(e) => {
          uploadFile(e.target.files[0], updateDataAboutCommodityImg);
        }}
      />
      <button
        type='button'
        onClick={() => {
          triggerUploadInput();
        }}
        className='btn btn-danger'
      >
        Загрузить файл
         <FontAwesomeIcon icon={faUpload}/>
      </button>
      <div className='fileUploader__dndText hidenElem'>Место для загрузки файла</div>
    </div>
  );
};

export default withStore(FileUploader);
