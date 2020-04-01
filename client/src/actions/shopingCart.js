const bookAddToCart = (bookId) => {
  return {
    type: 'BOOK_ADD_TO_CART',
    payload: bookId,
  };
};

const bookDeletedFromCart = (bookId) => {
  return {
    type: 'BOOK_DELETE_FROM_CART',
    payload: bookId,
  };
};

export const onAddedToCart = (dispatch) => (id) => {
  dispatch(bookAddToCart(id));
};

export const onDeletedFromCart = (dispatch) => (id) => {
  dispatch(bookDeletedFromCart(id));
};
