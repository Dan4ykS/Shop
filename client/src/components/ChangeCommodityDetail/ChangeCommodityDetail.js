import React from 'react';
import ImgUploader from '../ImgUploader';
import ChangeCommodityBtn from './ChangeCommodityBtn';
import InputWithPrompts from '../InputWithPrompts';
import RenderGenresData from '../RenderGenresData';
import './ChangeCommodityDetail.scss';
import { workWithCommodityData, deleteCommodity } from '../../utils/workWithApiRequests';
import { validateInput, initModalWindow } from '../../utils/workWithBrowser';
import { connectToStore } from '../../utils/workWithRedux';
import { toggleDropDown } from '../InputWithPrompts/utils';
import {
  updateDescr,
  updateImg,
  updatePreviewImg,
  updatePrice,
  updateShortDescr,
  updateTitle,
  updateAuthor,
} from '../../actions/commodityData.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddGenrOrTag from './AddGenrOrTag';

const ChangeCommodityDetail = ({
  type,
  userData: { token },
  dataForPrompts: { authors },
  commodityData: { title, descr, shortDescr, img, previewImg, price, updatedFields, author, tags, genres, id },
  actions: { updateImg, updatePreviewImg, updateTitle, updateDescr, updatePrice, updateShortDescr, updateAuthor },
  history,
}) => {
  const fieldsForChageBtn =
    type === 'update' ? updatedFields : { title, descr, shortDescr, img, previewImg, price, tags, genres, author };

  return (
    <>
      <form
        className='changeCommodityDetail'
        onSubmit={(e) => workWithCommodityData(e, updatedFields, token, type, id, history)}
        onClick={(e) => {
          toggleDropDown(e);
        }}
      >
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Название:</label>
          <div className='col-sm-9'>
            <input type='text' className='formControl' value={title} onChange={(e) => validateInput(e, updateTitle)} />
            <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
          </div>
        </div>
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Автор:</label>
          <div className='col-sm-9'>
            <InputWithPrompts funcForUpdate={updateAuthor} defaultValue={author} valuesForPrompts={authors} />
          </div>
        </div>
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Жанры:</label>
          <div className='col-sm-9'>
            <button className='addBtn btn' type='button' onClick={() => initModalWindow('.addGenre')}>
              Добавить жанр <FontAwesomeIcon size='sm' icon={faPlus} />
            </button>
            <RenderGenresData genres={genres} />
          </div>
        </div>
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Тэги:</label>
          <div className='col-sm-9'>
            <button className='addBtn btn' type='button' onClick={() => initModalWindow('.addTag')}>
              Добавить тэг <FontAwesomeIcon size='sm' icon={faPlus} />
            </button>
            <RenderGenresData genres={tags} />
          </div>
        </div>
        <div className='formGroup row'>
          <label className='col-sm-3 formControlLable'>Краткое описание:</label>
          <div className='col-sm-9'>
            <textarea
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
            <textarea className='formControl' value={descr} onChange={(e) => validateInput(e, updateDescr)} />
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
              className='formControl'
              value={price}
              onChange={(e) => validateInput(e, updatePrice, (input) => Number.isInteger(+input.value))}
            />
            <div className='invalidFeedback'>Поле обязательно (число) и не должно быть пустым</div>
          </div>
        </div>
        <div className='btnGroup'>
          <ChangeCommodityBtn type={type} updatedFields={fieldsForChageBtn} formSelector='.changeCommodityDetail' />
        </div>
      </form>
      <div className='modalWindow deleteCommodity flexWrapColumn_center hiddenElem'>
        <span data-close={true}></span>
        <div className='deleteCommodity__content'>Вы точно хотите удалить товар {title} ?</div>
        <div className='btnGroup_center'>
          <button className='btn btn-dark' onClick={() => deleteCommodity(id, token, history)} data-close={true}>
            Удалить
          </button>
          <button className='btn btn-dark' data-close={true}>
            Назад
          </button>
        </div>
      </div>
      <AddGenrOrTag mode='addGenre' />
      <AddGenrOrTag mode='addTag' />
    </>
  );
};

export default connectToStore(['userData.token', 'commodityData', 'dataForPrompts.authors'], {
  updateDescr,
  updateImg,
  updatePreviewImg,
  updatePrice,
  updateShortDescr,
  updateTitle,
  updateAuthor,
})(ChangeCommodityDetail, true);
