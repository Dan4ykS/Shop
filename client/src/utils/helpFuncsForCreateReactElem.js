import React from 'react';
import { scrollToElem } from './helpFuncsForBrouser';
import { Link } from 'react-router-dom';

const createElementWithIcon = (icon, item, className, updated) => {
  const { className: iconClassName } = icon;
  const { name, value } = item;
  const animationClass = updated && value !== 'Корзина' ? `${className} header__top_item` : className;
  return (
    <li className={animationClass}>
      <Link className='flexWrap' key={name} to={name}>
        <i className={iconClassName}></i>
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
