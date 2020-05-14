import React from 'react';
import GoodsList from '../components/GoodsList';
import withStore from '../utils/helpFuncsForRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { useCallback } from 'react';

const ProductPage = ({ goodsList, actions, userData: { token } }) => {
  const { loading, error } = goodsList;
  return (
    <>
      <h2>Товары</h2>
      <LoadingDataLogic
        configData={{
          loading,
          error,
          funcForRender: useCallback(actions.fetchGoods, []),
        }}
      >
        <GoodsList token={token} goodsList={goodsList} actions={actions} />
      </LoadingDataLogic>
    </>
  );
};

export default withStore(ProductPage);
