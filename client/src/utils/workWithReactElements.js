import React from 'react';
import StringHelper from './StringHelper';
import { scrollToElem, chekValidDataInForm, initModalWindow } from './workWithBrowser';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const createElementWithIcon = (icon, item, className, updated) => {
  const { name, value } = item;

  let classForElement = className;
  if (updated && value !== 'Корзина') {
    classForElement += ' animate';
  }
  return (
    <li className={classForElement}>
      <Link className='flexWrap' to={name}>
        <FontAwesomeIcon icon={icon} />
        <div style={{ marginLeft: '10px' }}>{value}</div>
      </Link>
    </li>
  );
};

const createElementWithOutIcon = (item, className) => {
  const { name, value } = item;
  return (
    <li className={className}>
      <Link onClick={() => scrollToElem('header')} to={name}>
        {value}
      </Link>
    </li>
  );
};

export const createLazyPage = (pageName) => React.lazy(() => import(`../pages/${pageName}Page`));

export const createItems = (items, className, iconsForItems = [], updated = false) => {
  return items.map((elem, index) => {
    let item;
    if (iconsForItems.length === 0) {
      item = createElementWithOutIcon(elem, className);
    } else {
      item = createElementWithIcon(iconsForItems[index], elem, className, updated);
    }
    return <React.Fragment key={index}>{item}</React.Fragment>;
  });
};

export const configForUthPages = (userName, loading, error) => {
  return {
    loading: !userName ? false: true,
    error: !userName ? null : error,
  };
};

export const createUpdateImgBtn = (updateFunc, img, imgSrc, oldImgSrc, newAlt, oldAlt) => {
  if ((img && imgSrc !== oldImgSrc && newAlt !== '') || (newAlt.trim() !== oldAlt && newAlt.trim())) {
    return (
      <button
        className='btn btn-success'
        onClick={(e) => {
          e.preventDefault();
          updateFunc(img, imgSrc, newAlt);
        }}
        data-close={true}
      >
        Обновить изображение
      </button>
    );
  }
  return null;
};

export const createUpdateDataBtn = (updatedFields, form, type) => {
  const formIsValid = chekValidDataInForm(form);
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

export const createDeleteCommodityBtn = (type) => {
  if (type === 'update') {
    return (
      <button onClick={() => initModalWindow('.deleteCommodity')} type='button'>
        Удалить книгу
      </button>
    );
  }
};

export const createTextWithBr = (text) => {
  const paragraphs = text.split('\n');
  return paragraphs.map((el) => {
    if (el === '') {
      return <br key={StringHelper.createId()} />;
    } else {
      return <p key={StringHelper.createId()}>{el}</p>;
    }
  });
};
