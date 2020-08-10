import React from 'react';
import ImgUploader from '../ImgUploader';
import ChangeCommodityBtn from './ChangeCommodityBtn';
import './ChangeCommodityDetail.scss';
import { workWithCommodityData, deleteCommodity } from '../../utils/workWithApiRequests';
import { validateInput } from '../../utils/workWithBrowser';

const ChangeCommodityDetail = ({
  data: { title, descr, shortDescr, img, previewImg, price, updatedFields, id, history, token },
  actions: { updateImg, updatePreviewImg, updateTitle, updateDescr, updatePrice, updateShortDescr },
  type,
}) => {
  return (
    <>
      <form
        className='changeCommodityDetail'
        onSubmit={(e) => workWithCommodityData(e, updatedFields, token, type, id, history)}
      >
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Название:</label>
          <div className='col-sm-9'>
            <input
              name='forSetData'
              type='text'
              className='formControl'
              value={title}
              onChange={(e) => validateInput(e, updateTitle)}
            />
            <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
          </div>
        </div>
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Краткое описание:</label>
          <div className='col-sm-9'>
            <textarea
              name='forSetData'
              className='formControl'
              value={shortDescr}
              onChange={(e) => validateInput(e, updateShortDescr, (input) => input.value.length < 300)}
            ></textarea>
            <div className='invalidFeedback'>Поле обязательно и не должно быть пустым (максимум 300 символов)</div>
          </div>
        </div>
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Превью:</label>
          <div className='col-sm-9'>
            <ImgUploader
              img={{
                src: previewImg?.previewImgSrc,
                alt: previewImg?.previewImgAlt,
                id: previewImg?.previewImgId,
              }}
              actionForUpdateImgData={updatePreviewImg}
            />
          </div>
        </div>
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Полное описание:</label>
          <div className='col-sm-9'>
            <textarea
              name='forSetData'
              className='formControl'
              value={descr}
              onChange={(e) => validateInput(e, updateDescr)}
            />
            <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
          </div>
        </div>
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Изображение:</label>
          <div className='col-sm-9'>
            <ImgUploader
              img={{
                src: img?.imgSrc,
                alt: img?.imgAlt,
                id: img?.imgId,
              }}
              actionForUpdateImgData={updateImg}
            />
          </div>
        </div>
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Цена:</label>
          <div className='col-sm-9'>
            <input
              name='forSetData'
              className='formControl'
              value={price}
              onChange={(e) => validateInput(e, updatePrice, (input) => Number.isInteger(+input.value))}
            />
            <div className='invalidFeedback'>Поле обязательно (число) и не должно быть пустым</div>
          </div>
        </div>
        <div className='btnGroup'>
          <ChangeCommodityBtn type={type} updatedFields={updatedFields} formSelector='.changeCommodityDetail' />
        </div>
      </form>
      <div className='modalWindow deleteCommodity flexWrapColumn_center hiddenElem'>
        <span data-close={true}>&#215;</span>
        <div className='deleteCommodity__content'>Вы точно хотите удалить товар {title} ?</div>
        <div className='btnGroup'>
          <button onClick={() => deleteCommodity(id, token, history)} data-close={true}>
            Удалить
          </button>
          <button data-close={true}>Вернуться к редактированию</button>
        </div>
      </div>
    </>
  );
};

export default ChangeCommodityDetail;
