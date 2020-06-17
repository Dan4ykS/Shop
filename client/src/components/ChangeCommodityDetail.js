import React from 'react';
import ImgUploader from './ImgUploader';
import '../styles/scss/ChangeCommodityDetail.scss';
import { updateCommodityData } from '../utils/workWithApiRequest';

const setValues = (data) => {
  return !data ? '' : data;
};

const ChangeCommodityDetail = ({
  data: { title, descr, shortDescr, img, previewImg, price, updatedFields, token, type, id },
  actions: { updateCommodityImg, updateCommodityPreviewImg, updateServerData, updateCommodityTitle, updateCommodityDescr, updateCommodityPrice, updateCommodityShortDescr },
}) => {
  return (
    <form className='changeCommodityDetail' onSubmit={(e) => updateCommodityData(e, updatedFields, token, type, id)}>
      <div className='formGroup row'>
        <label className='col-sm-3 colFormLable'>Название:</label>
        <div className='col-sm-9'>
          <input
            name='forSetData'
            type='text'
            className='formControl'
            value={setValues(title)}
            onChange={(e) => {
              updateCommodityTitle(e.target.value);
            }}
          />
        </div>
      </div>
      <div className='formGroup row'>
        <label className='col-sm-3 colFormLable'>Краткое описание:</label>
        <div className='col-sm-9'>
          <textarea
            name='forSetData'
            className='formControl'
            value={setValues(shortDescr)}
            onChange={(e) => {
              updateCommodityShortDescr(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div className='formGroup row'>
        <label className='col-sm-3 colFormLable'>Превью:</label>
        <div className='col-sm-9' style={{ position: 'static' }}>
          <ImgUploader
            img={{
              src: previewImg?.previewImgSrc,
              alt: previewImg?.previewImgAlt,
              id: previewImg?.previewImgId,
            }}
            actionForUpdateImgData={updateCommodityPreviewImg}
          />
        </div>
      </div>
      <div className='formGroup row'>
        <label className='col-sm-3 colFormLable'>Полное описание:</label>
        <div className='col-sm-9'>
          <textarea
            name='forSetData'
            className='formControl'
            value={setValues(descr)}
            onChange={(e) => {
              updateCommodityDescr(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div className='formGroup row'>
        <label className='col-sm-3 colFormLable'>Изображение:</label>
        <div className='col-sm-9'>
          <ImgUploader
            img={{
              src: img?.imgSrc,
              alt: img?.imgAlt,
              id: img?.imgId,
            }}
            actionForUpdateImgData={updateCommodityImg}
          />
        </div>
      </div>
      <div className='formGroup row'>
        <label className='col-sm-3 colFormLable'>Цена:</label>
        <div className='col-sm-9'>
          <input
            name='forSetData'
            className='formControl'
            value={setValues(price)}
            onChange={(e) => {
              updateCommodityPrice(e.target.value);
            }}
          />
        </div>
      </div>
      {Object.keys(updatedFields).length > 0 ? (
        <button className='changeCommodityDetail__btn' type='submit'>
          {type === 'update' ? 'Обновить данные' : 'Создать товар'}
        </button>
      ) : null}
    </form>
  );
};

export default ChangeCommodityDetail;
