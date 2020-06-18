import React from 'react';
import { scrollToElem, getDateFromLocalStorage, chekValidDataInForm } from './workWithBrowser';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const createElementWithIcon = (icon, item, className, updated) => {
  const { name, value } = item;
  const animationClass =
    updated && value !== 'Корзина' ? `${className} header__top_item` : className;
  return (
    <li className={animationClass}>
      <Link className='flexWrap' key={name} to={name}>
        <FontAwesomeIcon icon={icon} />
        <div style={{ marginLeft: '10px' }}>{value}</div>
      </Link>
    </li>
  );
};

const createElementWithOutIcon = (item, className, index) => {
  const { name, value } = item;
  return (
    <li className={className} key={name}>
      <Link onClick={() => scrollToElem('header')} to={name}>
        {value}
      </Link>
    </li>
  );
};

export const createItems = (items, className, iconsForItems = [], updated = false) => {
  return items.map((elem, index) => {
    const item =
      iconsForItems.length === 0
        ? createElementWithOutIcon(elem, className)
        : createElementWithIcon(iconsForItems[index], elem, className, updated);
    return <React.Fragment key={index}>{item}</React.Fragment>;
  });
};

export const configForUthPages = (token, loading, error) => {
  return {
    loading: getDateFromLocalStorage('userData') || token ? loading : false,
    error,
  };
};

export const switchProductBtn = (userName, ...eventHendlers) => {
  const [onAddedToCart, id = null, token = null] = eventHendlers;
  if (userName === 'admin') {
    return (
      <Link className='btn btn-success' to={`/admin/updateCommodity/${id}`}>
        Редактировать товар
      </Link>
    );
  }
  if (!userName) {
    return (
      <div className='flexWrap'>
        <button onClick={() => onAddedToCart(id, token)}>Купить в один клик</button>
        <Link className='btn btn-primary' to='/'>
          Подробнее
        </Link>
      </div>
    );
  }
  if (userName) {
    return (
      <div className='flexWrap'>
        <button>Купить в один клик!</button>
        <button onClick={() => onAddedToCart(id, token)}>В корзину</button>
        <Link className='btn btn-primary' to='/'>
          Подробнее
        </Link>
      </div>
    );
  }
};

export const setValues = (data) => {
  console.log('Установка значений');
  const elementsForSetData = document.querySelectorAll('[name=forSetData]');
  elementsForSetData.forEach((element, index) => (element.value = data[index]));
};

export const createUpdateImgBtn = (updateFunc, img, imgSrc, newAlt, oldAlt) => {
  if ((img && imgSrc && newAlt !== '') || (newAlt !== oldAlt && newAlt !== '')) {
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
