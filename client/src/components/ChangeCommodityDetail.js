import React from 'react';
import ImgUploader from './ImgUploader';
import '../styles/scss/ChangeCommodityDetail.scss';
import { workWithCommodityData, deleteCommodity } from '../utils/workWithApiRequest';
import { validateInput, setValues } from '../utils/workWithBrowser';
import { createUpdateDataBtn, createDeleteCommodityBtn } from '../utils/workWithCreateReactElem';

const ChangeCommodityDetail = ({
  data: { title, descr, shortDescr, img, previewImg, price, updatedFields, token, type, id },
  actions: {
    updateCommodityImg,
    updateCommodityPreviewImg,
    updateCommodityTitle,
    updateCommodityDescr,
    updateCommodityPrice,
    updateCommodityShortDescr,
  },
  history
}) => {
  return (
    <>
      <form
        className='changeCommodityDetail'
        onSubmit={(e) => workWithCommodityData(e, updatedFields, token, type, id)}
      >
        <div className='formGroup row'>
          <label className='col-sm-3 colFormLable'>Название:</label>
          <div className='col-sm-9'>
            <input
              name='forSetData'
              type='text'
              className='formControl'
              value={setValues(title)}
              onChange={(e) => validateInput(e, updateCommodityTitle)}
            />
            <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
          </div>
        </div>
        <div className='formGroup row'>
          <label className='col-sm-3 colFormLable'>Краткое описание:</label>
          <div className='col-sm-9'>
            <textarea
              name='forSetData'
              className='formControl'
              value={setValues(shortDescr)}
              onChange={(e) => validateInput(e, updateCommodityShortDescr)}
            ></textarea>
            <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
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
              onChange={(e) => validateInput(e, updateCommodityDescr)}
            ></textarea>
            <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
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
              onChange={(e) =>
                validateInput(e, updateCommodityPrice, (input) => Number.isInteger(+input.value))
              }
            />
            <div className='invalidFeedback'>Поле обязательно (число) и не должно быть пустым</div>
          </div>
        </div>
        <div className='btnGroup'>
          {createUpdateDataBtn(updatedFields, '.changeCommodityDetail', type)}
          {createDeleteCommodityBtn(type)}
        </div>
      </form>
      <div className='modalWindow deleteCommodity flexWrapColumn_center hidenElem'>
        <span data-close={true}>&#215;</span>
        <div className='deleteCommodity__content'>Вы точно хотите удалить товар {title} ?</div>
        <div className='btnGroup'>
          <button onClick={() => deleteCommodity(id, token, history)} data-close={true}>Удалить</button>
          <button data-close={true}>Вернуться к редактированию</button>
        </div>
      </div>
    </>
  );
};

export default ChangeCommodityDetail;
