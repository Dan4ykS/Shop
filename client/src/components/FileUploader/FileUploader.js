import React, { useEffect } from 'react';
import './FileUploader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { triggerUploadInput, uploadFile, preventDefaultFaileUpload, removePreventDefault, dragAndDropForFile } from '../../utils/workWithFiles';

const FileUploader = ({ action, id, text = 'Загрузить файл' }) => {
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
        name={`uploader${id}`}
        onChange={(e) => {
          uploadFile(e.target.files[0], action);
        }}
      />
      <button
        type='button'
        onClick={() => {
          triggerUploadInput(id);
        }}
        className='btn-danger'
      >
        {text}
        <FontAwesomeIcon icon={faUpload} />
      </button>
      <div className='fileUploader__dndText hiddenElem'>Место для загрузки файла</div>
    </div>
  );
};

export default FileUploader;
