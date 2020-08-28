import React, { useState } from 'react';
import InputWithPrompts from '../InputWithPrompts';
import { connectToStore } from '../../utils/workWithRedux';
import { updateGenres, updateTags } from '../../actions/commodityData';
import { hidenModal } from '../../utils/workWithBrowser';

const AddGenrOrTag = ({
  dataForPrompts: { genres: allGenres, tags: allTags },
  commodityData: { genres, tags },
  actions: { updateGenres, updateTags },
  mode,
}) => {
  const [value, changeValue] = useState(''),
    prompts = mode === 'addGenre' ? allGenres : allTags,
    oldData = mode === 'addGenre' ? genres : tags,
    modalClass = mode === 'addGenre' ? 'addGenre' : 'addTag',
    title = mode === 'addGenre' ? 'жанра' : 'тега',
    textForPlaceHolder = mode === 'addGenre' ? 'жанр' : 'тег',
    funcForUpdateStore = mode === 'addGenre' ? updateGenres : updateTags;

  return (
    <div className={`modalWindow ${modalClass} hiddenElem`}>
      <h2>Добавление {title}</h2>
      <span data-close={true}></span>
      <InputWithPrompts
        funcForUpdate={changeValue}
        defaultValue={value}
        placeholder={`Выбери ${textForPlaceHolder} или создай новый`}
        modeForDropDown='open'
        valuesForPrompts={prompts}
        needValidate={false}
      />
      <div className='btnGroup'>
        <button
          className='btn'
          disabled={!value.trim() || oldData.includes(value.trim()) ? true : false}
          data-close={true}
          onClick={() => {
            funcForUpdateStore(value.trim());
            hidenModal(`.${modalClass}`);
            changeValue('');
          }}
        >
          Добавить
        </button>
        <button className='btn' data-close={true}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default connectToStore(['dataForPrompts', 'commodityData'], { updateGenres, updateTags })(AddGenrOrTag);
