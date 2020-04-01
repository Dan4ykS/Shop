const updateBookList = (state, action) => {
  if (state === undefined) {
    return {
      books: [],
      loading: true,
      error: null,
    };
  }
  
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        books: [],
        error: null,
        loading: true,
      };
    case 'FETCH_BOOKS_SUCCUESS':
      return {
        books: action.payload,
        error: null,
        loading: false,
      };
    case 'FETCH_BOOKS_FAILURE':
      return {
        books: [],
        error: action.payload,
        loading: false,
      };
    case 'DELETE_ERROR_INDICATOR':
      return {
        books: [],
        loading: true,
        error: null,
      };
    default:
      return state.bookList;
  }
};

export default updateBookList;
