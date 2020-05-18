import React, { useEffect } from 'react';
import { scrollToElem, getDateFromLocalStorage } from './workWithBrowser';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const createElementWithIcon = (icon, item, className, updated) => {
  const { name, value } = item;
  const animationClass = updated && value !== 'Корзина' ? `${className} header__top_item` : className;
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
    const item = iconsForItems.length === 0 ? createElementWithOutIcon(elem, className) : createElementWithIcon(iconsForItems[index], elem, className, updated);
    return <React.Fragment key={index}>{item}</React.Fragment>;
  });
};

export const configForUthPages = (userName, token, loading, error, invalidRoute) => {
  return {
    loading: getDateFromLocalStorage('userData') !== null || token !== null ? loading : false,
    error: userName !== null ? error : null,
    funcForRender: () => {
      if (token !== null) {
        invalidRoute();
      }
    },
    roteForRedirect: '/',
  };
};

export const switchProductBtn = (userName, ...eventHendlers) => {
  const [onAddedToCart, id = null, token = null] = eventHendlers;
  if (userName === 'admin') {
    return (
      <Link className='btn btn-success' to='/admin/'>
        Редактировать товар
      </Link>
    );
  }
  if (!userName) {
    return (
      <div className='btnGroup flexWrap'>
        <button onClick={() => onAddedToCart(id, token)}>Купить в один клик</button>
        <Link className='btn btn-primary' to='/'>
          Подробнее
        </Link>
      </div>
    );
  }
  if (userName) {
    return (
      <div className='btnGroup flexWrap'>
        <button>Купить в один клик!</button>
        <button onClick={() => onAddedToCart(id, token)}>В корзину</button>
        <Link to='/'>Подробнее</Link>
      </div>
    );
  }
};
