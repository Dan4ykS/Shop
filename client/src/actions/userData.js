import { clearCart, loadCartFromServer } from './shopingCart';
import { fetchGoodsSuccuess } from './goodsList';
import { isInvalid, redirectToPage, clearInputs, activateBtn } from '../utils/workWithBrowser';
import { setNewToken } from '../utils/workWithApiRequest';
import { createAction } from '../utils/workWithRedux';

const createUser = (userName, token) => createAction('CREATE_NEW_USER', { userName, token });

const resetError = () => createAction('RESET_ERROR');

export const userLogin = (userName, token) => createAction('USER_LOGIN', { userName, token });

export const userLogout = () => createAction('USER_LOGOUT');

export const invalidRoute = () => createAction('INVALID_ROUTE');

const authErrorHeandler = ({ inputs, selector }) => {
  clearInputs(inputs);
  activateBtn(`${selector} button`);
  isInvalid(inputs);
};

export const authorization = (dispatch, { usersService, goodsService }) => async (data, formData, history) => {
  try {
    const token = await usersService.authUser(data);
    redirectToPage(history, '/');
    dispatch(userLogin(data.userName, token));
    if (data.userName !== 'admin') {
      const cart = await goodsService.loadCart(token);
      dispatch(loadCartFromServer(cart));
    }
    const goods = await goodsService.getGoods();
    dispatch(fetchGoodsSuccuess(goods));
    setNewToken(token);
  } catch (error) {
    authErrorHeandler(formData);
  }
};

export const registration = (dispatch, { usersService, goodsService }) => async (data, formData, history) => {
  try {
    const token = await usersService.createUser(data);
    redirectToPage(history, '/');
    dispatch(createUser(data.userName, token));
    const cart = await goodsService.loadCart(token);
    const goods = await goodsService.getGoods();
    dispatch(loadCartFromServer(cart));
    dispatch(fetchGoodsSuccuess(goods));
    setNewToken(token);
  } catch (error) {
    authErrorHeandler(formData);
  }
};

export const isLogin = (dispatch, { usersService }) => async (token) => {
  try {
    const { userName, newToken } = await usersService.checkUserValid(token);
    dispatch(userLogin(userName, newToken));
    setNewToken(newToken);
    return userName;
  } catch (error) {
    dispatch(invalidRoute());
    dispatch(resetError());
  }
};

export const isLogout = (dispatch) => () => {
  dispatch(userLogout());
  dispatch(clearCart());
  localStorage.removeItem('userData');
};
