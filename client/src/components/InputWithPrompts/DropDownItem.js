import React from 'react';
import { toggleDropDown, removeInvalid } from './utils';

const DropDownItem = ({ data: { value }, options: { changeValue, funcForUpdate, needValidate, modeForDropDown } }) => {
  return (
    <div
      className='dropDown__item'
      onClick={(e) => {
        const newValue = e.target.textContent;
        changeValue(newValue);
        funcForUpdate(newValue);
        if (needValidate) {
          removeInvalid(e);
        }
        if (modeForDropDown === 'default') {
          toggleDropDown(e, 'close');
        }
      }}
    >
      {value}
    </div>
  );
};

export default DropDownItem;
