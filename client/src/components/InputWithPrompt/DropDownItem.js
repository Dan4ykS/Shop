import React from 'react';
import { toggleDropDown, removeInvalid } from './utils';

const DropDownItem = ({ data: { value }, changeData }) => {
  return (
    <div
      className='dropDown__item'
      onClick={(e) => {
        changeData(e.target.textContent);
        removeInvalid(e);
        toggleDropDown(e, 'close');
      }}
    >
      {value}
    </div>
  );
};

export default DropDownItem;
