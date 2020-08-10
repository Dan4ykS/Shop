import React, { useState } from 'react';
import './Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchGoods } from '../../actions/goodsList';
import { findGoods } from '../../utils/workWithApiRequests';

const Search = ({ actions: { fetchGoods }, history }) => {
  const [value, updateValue] = useState('');
  return (
    <form className='search' onSubmit={(e) => findGoods(e, history, value, fetchGoods)}>
      <input
        type='text'
        placeholder='Поиск по авторам, книгам ...'
        value={value.trimStart()}
        onChange={(e) => updateValue(e.target.value)}
      />
      <button className='btn' type='submit'>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default connectToStore(null, { fetchGoods })(Search, true);
