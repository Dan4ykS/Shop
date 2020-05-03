import React from 'react';
import BookList from '../components/BookList';
import withStore from '../utils/helpFuncsForRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { useCallback } from 'react';

const ProductPage = ({ bookList, actions, userData: { token } }) => {
  const configData = {
    loading: bookList.loading,
    error: bookList.error,
    loadingData: useCallback(actions.fetchBooks, []),
  };
  return (
    <>
      <h2>Товары</h2>
      <LoadingDataLogic configData={configData}>
        <BookList bookList={bookList} actions={actions} />
      </LoadingDataLogic>
    </>
  );
};

export default withStore(ProductPage);
