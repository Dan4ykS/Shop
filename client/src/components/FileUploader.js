import React, { useEffect } from 'react';
import '../styles/scss/FileUploader.scss';
import withStore from '../utils/helpFuncsForRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { triggerUploadInput, uploadFile, preventDefaultFaileUpload, removePreventDefault, dragAndDropForFile } from '../utils/workWithFiles';

const FileUploader = ({ actions: { updateImg } }) => {
  useEffect(() => {
    preventDefaultFaileUpload();
    dragAndDropForFile(updateImg);
    return () => {
      removePreventDefault();
    };
  }, [updateImg]);
  return (
    <div className='fileUploader'>
      <input
        type='file'
        name='uploader'
        onChange={(e) => {
          uploadFile(e.target.files[0], updateImg);
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
