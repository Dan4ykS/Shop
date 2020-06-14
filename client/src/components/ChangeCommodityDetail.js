import React, { useEffect } from 'react';
import ImgUploader from './ImgUploader';
import '../styles/scss/ChangeCommodityDetail.scss';
import { setValues } from '../utils/workWithCreateReactElem';

const ChangeCommodityDetail = ({ data = null, actions: { updateImg, updatePreviewImg } }) => {
  useEffect(() => {
    if (data) {
      const valuesForElement = [];
      for (const key in data) {
        if (key !== 'previewImgSrc' || key !== 'imgSrc') {
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
        <div className='col-sm-9' style={{ position: 'static' }}>
          <ImgUploader
            img={{
              src: data?.previewImg.previewImgSrc,
              alt: data?.previewImg.previewImgAlt,
              id: data?.previewImg.previewImgId,
            }}
            actionForUpload={updatePreviewImg}
          />
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
          <ImgUploader
            img={{
              src: data?.img.imgSrc,
              alt: data?.img.imgAlt,
              id: data?.img.imgId
            }}
            actionForUpload={updateImg}
          />
        </div>
      </div>
    </form>
  );
};

export default ChangeCommodityDetail;
