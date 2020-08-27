import React, { useState, useEffect } from 'react';
import ListView from '../ListView';
import DropDownItem from './DropDownItem';
import './InputWithPrompt.scss';
import { toggleDropDown } from './utils';
import { validateInput } from '../../utils/workWithBrowser';

const InputWithPrompt = ({ defaultValue = '', valuesForPrompts = [] }) => {
  const [data, changeData] = useState(defaultValue),
    [values, changeValues] = useState(valuesForPrompts);

  useEffect(() => {
    changeValues(valuesForPrompts);
  }, [valuesForPrompts]);

  return (
    <div className='inputWithPrompt'>
      <input
        type='text'
        className='formControl'
        onClick={(e) => {
          toggleDropDown(e);
        }}
        value={data}
        onChange={(e) => {
          const value = e.target.value.toLocaleLowerCase();
          validateInput(e, changeData);
          changeValues(valuesForPrompts.filter((el) => el.value.toLowerCase().includes(value)));
        }}
      />
      <div className='dropDown hiddenElem'>
        <ListView listForRender={values} ComponentForRender={DropDownItem} changeData={changeData} />
      </div>
      <div className='backdrop hiddenElem' onClick={(e) => toggleDropDown(e, 'close')}></div>
      <div className='invalidFeedback'>Поле обязательно и не должно быть пустым</div>
    </div>
  );
};

export default InputWithPrompt;
