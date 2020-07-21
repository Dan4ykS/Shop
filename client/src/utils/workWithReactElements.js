import React from 'react';
import StringHelper from './StringHelper';

export const createLazyPage = (pageName) => React.lazy(() => import(`../pages/${pageName}Page`));

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
