import React from 'react';
import StringHelper from './StringHelper';
import { scrollToElem } from './workWithBrowser';
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
