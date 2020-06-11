import React, { useEffect } from 'react';
import '../styles/scss/FileUploader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { triggerUploadInput, uploadFile, preventDefaultFaileUpload, removePreventDefault, dragAndDropForFile } from '../utils/workWithFiles';

const FileUploader = ({ action }) => {
  useEffect(() => {
    preventDefaultFaileUpload();
    dragAndDropForFile(action);
    return () => {
      removePreventDefault();
    };
  }, [action]);
  return (
    <div className='fileUploader'>
      <input
        type='file'
        name='uploader'
        onChange={(e) => {
          uploadFile(e.target.files[0], action);
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
        <FontAwesomeIcon icon={faUpload} />
      </button>
      <div className='fileUploader__dndText hidenElem'>Место для загрузки файла</div>
    </div>
  );
};

export default FileUploader;
