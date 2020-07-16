import { clearCart, loadCartFromServer } from './shopingCart';
import { fetchGoodsSuccuess } from './goodsList';
import { isInvalid, redirectToPage, clearInputs, activateBtn } from '../utils/workWithBrowser';
import { setNewToken } from '../utils/workWithApiRequests';
import { createAction } from '../utils/workWithRedux';
import UsersService from '../services/UsersService';
import GoodsService from '../services/GoodsService';

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

export const authorization = (data, formData, history) => async (dispatch) => {
  try {
    const token = await UsersService.authUser(data);
    redirectToPage(history, '/');
    dispatch(userLogin(data.userName, token));
    if (data.userName !== 'admin') {
      const cart = await GoodsService.loadCart(token);
      dispatch(loadCartFromServer(cart));
    }
    const goods = await GoodsService.getGoods();
    dispatch(fetchGoodsSuccuess(goods));
    setNewToken(token);
  } catch (error) {
    authErrorHeandler(formData);
  }
};

export const registration = (data, formData, history) => async (dispatch) => {
  try {
    const token = await UsersService.createUser(data);
    redirectToPage(history, '/');
    dispatch(createUser(data.userName, token));
    const cart = await GoodsService.loadCart(token);
    const goods = await GoodsService.getGoods();
    dispatch(loadCartFromServer(cart));
    dispatch(fetchGoodsSuccuess(goods));
    setNewToken(token);
  } catch (error) {
    authErrorHeandler(formData);
  }
};

export const isLogin = (token) => async (dispatch) => {
  try {
    const { userName, newToken } = await UsersService.checkUserValid(token);
    dispatch(userLogin(userName, newToken));
    setNewToken(newToken);
    return userName;
  } catch (error) {
    dispatch(invalidRoute());
    dispatch(resetError());
  }
};

export const isLogout = () => (dispatch) => {
  dispatch(userLogout());
  dispatch(clearCart());
  localStorage.removeItem('userData');
};
