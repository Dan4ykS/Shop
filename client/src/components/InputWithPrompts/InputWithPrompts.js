import React, { useState, useEffect } from 'react';
import ListView from '../ListView';
import DropDownItem from './DropDownItem';
import './InputWithPrompts.scss';
import { toggleDropDown } from './utils';
import { validateInput } from '../../utils/workWithBrowser';

const InputWithPrompt = ({
  funcForUpdate,
  modeForDropDown = 'default',
  placeholder = '',
  defaultValue = '',
  valuesForPrompts = [],
  needValidate = true,
}) => {
  const [prompts, changePrompts] = useState(valuesForPrompts),
    [value, changeValue] = useState(defaultValue),
    classForDropDown = modeForDropDown === 'default' ? 'hiddenElem' : '',
    optionsForDropDown = {
      changeValue,
      funcForUpdate,
      needValidate,
      modeForDropDown,
    };

  useEffect(() => {
    changeValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    changePrompts(valuesForPrompts);
  }, [valuesForPrompts]);

  return (
    <div className='inputWithPrompt'>
      <input
        type='text'
        className='formControl'
        data-open-dropdown={true}
        placeholder={placeholder}
        onFocus={(e) => {
          if (modeForDropDown === 'default') {
            toggleDropDown(e);
          }
        }}
        value={value.trimStart()}
        onChange={(e) => {
          const newValue = e.target.value;
          if (needValidate) {
            validateInput(e, changeValue);
          } else {
            changeValue(newValue);
          }
          funcForUpdate(newValue);
          changePrompts(valuesForPrompts.filter((el) => el.value.toLowerCase().includes(newValue.toLocaleLowerCase())));
        }}
      />
      <div className={`dropDown ${classForDropDown}`}>
        <ListView listForRender={prompts} ComponentForRender={DropDownItem} options={optionsForDropDown} />
      </div>
      <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
    </div>
  );
};

export default InputWithPrompt;
