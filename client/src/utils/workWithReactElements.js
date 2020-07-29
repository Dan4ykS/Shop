import React from 'react';
import StringHelper from './StringHelper';

export const createLazyPage = (pageName) => React.lazy(() => import(`../pages/${pageName}Page`));

export const trimText = (text, maxlength = text.length) => (text.length > maxlength ? text.substr(0, maxlength - 3) + '...' : text);

export const createTextWithBr = (text, maxlength) => {
  const str = trimText(text, maxlength),
    paragraphs = str.split('\n');

  return paragraphs.map((el) => {
    if (el === '') {
      return <br key={StringHelper.createId()} />;
    } else {
      return <p key={StringHelper.createId()}>{el}</p>;
    }
  });
};
