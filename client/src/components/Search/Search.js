import React, { useState } from 'react';
import './Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connectToStore } from '../../utils/workWithRedux';
import { searchGoods } from '../../actions/goodsList';
import { findGoods } from '../../utils/workWithApiRequests';

const Search = ({ actions: { searchGoods }, history }) => {
  const [value, updateValue] = useState('');
  return (
    <form className='search' onSubmit={(e) => findGoods(e, history, value, searchGoods)}>
      <input
        type='text'
        placeholder='Поиск по авторам, книгам ...'
        value={value.trimStart()}
        onChange={(e) => updateValue(e.target.value)}
      />
      <button type='submit'>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default connectToStore(null, { searchGoods })(Search, true);
