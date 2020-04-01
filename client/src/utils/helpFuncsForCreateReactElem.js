import React from 'react';
import { scrollToElem } from './helpFuncsForBrouser';
import { Link } from 'react-router-dom';

const createElementWithIcon = (icon, item, className) => {
  const { className: icoclassName } = icon;
  const { name, value } = item;
  return (
    <div className='flexWrap test' key={Math.random()}>
      <Link key={Math.random()} to={name}>
        <i className={icoclassName} key={Math.random()}></i>
      </Link>
      <li className={className} key={Math.random()}>
        <Link key={Math.random()} to={name}>
          {value}
        </Link>
      </li>
    </div>
  );
};

const createElementWithOutIcon = (item, className, index) => {
  const { name, value } = item;
  return (
    <li className={className} key={name}>
      <Link onClick={() => scrollToElem('header')} key={name} to={name}>
        {value}
      </Link>
    </li>
  );
};

export const createItems = (items, className, iconsForItems = []) => {
  return items.map((elem, index) => {
    const item = iconsForItems.length === 0 ? createElementWithOutIcon(elem, className, index) : createElementWithIcon(iconsForItems[index], elem, className);
    return <React.Fragment key={Math.random()}>{item}</React.Fragment>;
  });
};
