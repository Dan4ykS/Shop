import React from 'react';
import GoodsList from './GoodsList';
import Search from './Search/Search';
import Filters from './Filter/Filter';

const GoodsPage = () => {
  return (
    <>
      <Search />
      <Filters />
      <GoodsList />
    </>
  );
};

export default GoodsPage;
