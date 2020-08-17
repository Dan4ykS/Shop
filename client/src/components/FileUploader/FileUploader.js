import React, { useEffect } from 'react';
import './FileUploader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import {
  triggerUploadInput,
  uploadFile,
  preventDefaultFaileUpload,
  removePreventDefault,
  dragAndDropForFile,
} from '../../utils/workWithFiles';
import StringHelper from '../../utils/StringHelper';

const FileUploader = ({ action, id = StringHelper.createId(), text = 'Загрузить файл', withDropDown = true }) => {
  useEffect(() => {
    if (withDropDown) {
      preventDefaultFaileUpload();
      dragAndDropForFile(action);
      return () => {
        removePreventDefault();
      };
    }
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
        className='btn'
      >
        {text}
        <FontAwesomeIcon icon={faUpload} />
      </button>
      {withDropDown ? <div className='fileUploader__dndText hiddenElem'>Место для загрузки файла</div> : null}
    </div>
  );
};

export default FileUploader;
