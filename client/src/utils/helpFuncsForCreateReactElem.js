import React from 'react';
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
