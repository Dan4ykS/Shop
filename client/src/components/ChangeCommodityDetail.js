import React, { useEffect } from 'react';
import ImgUploader from './ImgUploader';
import '../styles/scss/ChangeCommodityDetail.scss';
import { setValues } from '../utils/workWithCreateReactElem';

const ChangeCommodityDetail = ({ data = null, actions: { updateImg, updatePreviewImg, updateServerData } }) => {
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
    <form className='changeCommodityDetail' onSubmit={() => updateServerData()}>
      <div className='formGroup row'>
        <label className='col-sm-3 colFormLable'>Название:</label>
        <div className='col-sm-9'>
          <input name='forSetData' type='text' className='formControl' />
        </div>
      </div>
      <div className='formGroup row'>
        <label className='col-sm-3 colFormLable'>Краткое описание:</label>
        <div className='col-sm-9'>
          <textarea name='forSetData' className='formControl'></textarea>
        </div>
      </div>
      <div className='formGroup row'>
        <label className='col-sm-3 colFormLable'>Превью:</label>
        <div className='col-sm-9' style={{ position: 'static' }}>
          <ImgUploader
            img={{
              src: data?.previewImg.previewImgSrc,
              alt: data?.previewImg.previewImgAlt,
              id: data?.previewImg.previewImgId,
            }}
            actionForUpdateImgData={updatePreviewImg}
          />
        </div>
      </div>
      <div className='formGroup row'>
        <label className='col-sm-3 colFormLable'>Полное описание:</label>
        <div className='col-sm-9'>
          <textarea name='forSetData' className='formControl'></textarea>
        </div>
      </div>
      <div className='formGroup row'>
        <label className='col-sm-3 colFormLable'>Изображение:</label>
        <div className='col-sm-9'>
          <ImgUploader
            img={{
              src: data?.img.imgSrc,
              alt: data?.img.imgAlt,
              id: data?.img.imgId,
            }}
            actionForUpdateImgData={updateImg}
          />
        </div>
      </div>
    </form>
  );
};

export default ChangeCommodityDetail;
