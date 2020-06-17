import { createAction } from '../utils/workWithRedux';

const commodityAddToCart = (bookId) => createAction('BOOK_ADD_TO_CART', bookId);

const commodityDeletedFromCart = (bookId) => createAction('BOOK_DELETE_FROM_CART', bookId);

export const loadCartFromServer = (cart) => createAction('LOAD_CART_FROM_SERVER', cart);

export const clearCart = () => createAction('CLEAR_CART');

export const onAddedToCart = (dispatch, { goodsService }) => async (id, token) => {
  try {
    dispatch(commodityAddToCart(id));
    await goodsService.addToCart(id, token);
  } catch (error) {
    console.log(error);
  }
};

export const onDeletedFromCart = (dispatch, { goodsService }) => async (id, token) => {
  try {
    dispatch(commodityDeletedFromCart(id));
    await goodsService.removeFormCart(id, token);
  } catch (error) {
    console.log(error);
  }
};

export const loadCart = (dispatch, { goodsService }) => async (token) => {
  try {
    const cart = await goodsService.loadCart(token);
    dispatch(loadCartFromServer(cart));
  } catch (error) {
    console.log(error);
  }
};
