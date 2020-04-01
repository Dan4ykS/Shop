const fetchBooksRequest = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST',
  };
};

const fetchBooksSuccuess = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCUESS',
    payload: newBooks,
  };
};

const fetchBooksFailure = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error,
  };
};

export const fetchBooks = (dispatch, { bookstoreService }) => (token) => {
  dispatch(fetchBooksRequest());
  bookstoreService
    .getBooks(token)
    .then((data) => dispatch(fetchBooksSuccuess(data)))
    .catch((error) => dispatch(fetchBooksFailure(error)));
};
