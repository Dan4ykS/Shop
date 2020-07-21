import React from 'react';
import GoodsList from './GoodsList';
import Filters from './Filter/Filter';

const GoodsPage = () => {
  return (
    <>
      <Filters />
      <GoodsList />
    </>
  );
};

export default GoodsPage;
