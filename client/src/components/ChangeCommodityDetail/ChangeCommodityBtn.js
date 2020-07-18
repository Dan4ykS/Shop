import React from 'react';
import { initModalWindow, chekValidDataInForm } from '../../utils/workWithBrowser';

const createUpdateDataBtn = (updatedFields, formSelector, type) => {
  const formIsValid = chekValidDataInForm(formSelector);
  let allFieldsAreFilled = true;
  for (const key in updatedFields) {
    if (!updatedFields[key] && key !== 'img') {
      allFieldsAreFilled = false;
    }
  }
  if (Object.keys(updatedFields).length > 0 && type === 'update' && formIsValid) {
    return (
      <button className='changeCommodityDetail__btn' type='submit'>
        Обновить данные
      </button>
    );
  } else if (type === 'create' && formIsValid && allFieldsAreFilled) {
    return (
      <button className='changeCommodityDetail__btn' type='submit'>
        Создать новый товар
      </button>
    );
  } else {
    return null;
  }
};

const createDeleteCommodityBtn = (type) => {
  if (type === 'update') {
    return (
      <button onClick={() => initModalWindow('.deleteCommodity')} type='button'>
        Удалить книгу
      </button>
    );
  }
};

const ChangeCommodityBtn = ({ type, formSelector, updatedFields }) => {
  return (
    <>
      {createUpdateDataBtn(updatedFields, formSelector, type)}
      {createDeleteCommodityBtn(type)}
    </>
  );
};

export default ChangeCommodityBtn;
