import GoodsService from '../services/GoodsService';
import UsersService from '../services/UsersService';
import { createAction } from '../utils/workWithRedux';
import { BOOK_ADD_TO_CART, BOOK_DELETE_FROM_CART, FETCH_CART_SUCCUESS, CLEAR_CART } from './types';
import { redirectToPage, scrollToTop } from '../utils/workWithBrowser';
import { updateBoughtGoods } from './userData';

const commodityAddToCart = (bookId) => createAction(BOOK_ADD_TO_CART, bookId);

const commodityDeletedFromCart = (bookId) => createAction(BOOK_DELETE_FROM_CART, bookId);

export const loadCartFromServer = (cart) => createAction(FETCH_CART_SUCCUESS, cart);

export const clearCart = () => createAction(CLEAR_CART);

export const onAddedToCart = (id, token) => async (dispatch) => {
  try {
    dispatch(commodityAddToCart(id));
    await GoodsService.addToCart(id, token);
  } catch (error) {
    console.log(error);
  }
};

export const onDeletedFromCart = (id, token) => async (dispatch) => {
  try {
    dispatch(commodityDeletedFromCart(id));
    await GoodsService.removeFromCart(id, token);
  } catch (error) {
    console.log(error);
  }
};

export const loadCart = (token) => async (dispatch) => {
  try {
    const cart = await GoodsService.loadCart(token),
      countGoods = cart.userCart.reduce((acc, item) => acc + item.copies, 0);

    dispatch(loadCartFromServer({ ...cart, countGoods }));
  } catch (error) {
    console.log(error);
  }
};

export const buyGoods = (token, history) => async (dispatch) => {
  try {
    await UsersService.buyGoods(token);
    const { boughtGoods } = await UsersService.updateBoughtGoodsData(token);
    dispatch(updateBoughtGoods(boughtGoods));
    redirectToPage(history, '/MyAccount');
    scrollToTop();
    dispatch(clearCart());
  } catch (error) {
    console.log(error);
  }
};
