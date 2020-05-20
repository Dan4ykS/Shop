import React, { useEffect } from 'react';
import FileUploader from './FileUploader';
import '../styles/scss/DetailForWorkWithCommodity.scss';
import { setValues } from '../utils/workWithCreateReactElem';
import withStore from '../utils/workWithRedux';

const DetailForWorkWithCommodity = ({ data = null, actions: { updateImg, updatePreviewImg } }) => {
  useEffect(() => {
    if (data) {
      const { previewImg, img } = data;
      const valuesForElement = [];
      for (const key in data) {
        if (key !== 'previewImg' || key !== 'img') {
          valuesForElement.push(data[key]);
        }
      }
      setValues(valuesForElement);
    }
  }, [data]);
  return (
    <form onSubmit={() => {}}>
      <div className='form-group row'>
        <label className='col-sm-3'>Название:</label>
        <div className='col-sm-9'>
          <input name='forSetData' type='text' className='form-control' />
        </div>
      </div>
      <div className='form-group row'>
        <label className='col-sm-3'>Краткое описание:</label>
        <div className='col-sm-9'>
          <textarea name='forSetData' className='form-control'></textarea>
        </div>
      </div>
      <div className='form-group row'>
        <label className='col-sm-3'>Превью:</label>
        <div className='col-sm-9'>
          <FileUploader action={updatePreviewImg} />
        </div>
      </div>
      <div className='form-group row'>
        <label className='col-sm-3'>Полное описание:</label>
        <div className='col-sm-9'>
          <textarea name='forSetData' className='form-control'></textarea>
        </div>
      </div>
      <div className='form-group row'>
        <label className='col-sm-3'>Изображение:</label>
        <div className='col-sm-9'>
          <FileUploader action={updateImg} />
        </div>
      </div>
    </form>
  );
};

export default withStore(DetailForWorkWithCommodity);
