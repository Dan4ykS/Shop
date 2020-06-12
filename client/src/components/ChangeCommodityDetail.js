import React, { useEffect } from 'react';
import '../styles/scss/ChangeCommodityDetail.scss';
import { setValues } from '../utils/workWithCreateReactElem';
import ImgUploader from './ImgUploader';

/**
 *
 * Подумать над тем нужно ли подключать компонент к Store
 */

const ChangeCommodityDetail = ({ data = null, actions: { updateImg, updatePreviewImg } }) => {
  useEffect(() => {
    // console.log(data)
    if (data) {
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
        <div className='col-sm-9' style={{position: 'static'}}>
          <ImgUploader imgSrc={data?.previewImgSrc} actionForUpload={updatePreviewImg} />
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
          <ImgUploader imgSrc={data?.imgSrc} actionForUpload={updateImg} />
        </div>
      </div>
    </form>
  );
};

export default ChangeCommodityDetail;
