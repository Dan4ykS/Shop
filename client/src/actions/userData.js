import { isInvalid } from '../utils/helpFuncsForBrouser';
import { clearCart, loadCartFromServer } from './shopingCart';

const userLogin = (userName, token) => {
  return {
    type: 'USER_LOGIN',
    payload: { userName, token },
  };
};

const createUser = (userName, token) => {
  return {
    type: 'CREATE_NEW_USER',
    payload: { userName, token },
  };
};

const userLogout = () => {
  return {
    type: 'USER_LOGOUT',
  };
};

const invalidToken = () => {
  return {
    type: 'INVALID_TOKEN',
  };
};

export const authorization = (dispatch, { usersService, goodsService }) => async (data, form) => {
  try {
    const token = await usersService.authUser(data);
    const cart = await goodsService.loadCart(token);
    dispatch(userLogin(data.userName, token));
    dispatch(loadCartFromServer(cart));
    localStorage.setItem('userData', JSON.stringify({ token }));
  } catch (err) {
    isInvalid(form);
  }
};

export const registration = (dispatch, { usersService, goodsService }) => async (data, form) => {
  try {
    const token = await usersService.createUser(data);
    const cart = await goodsService.loadCart(token);
    dispatch(createUser(data.userName, token));
    dispatch(loadCartFromServer(cart));
    localStorage.setItem('userData', JSON.stringify({ token }));
  } catch (error) {
    isInvalid(form);
  }
};

export const isLogin = (dispatch, { usersService }) => async (token) => {
  try {
    const { userName } = await usersService.checkUserValid(token);
    dispatch(userLogin(userName, token));
  } catch (error) {
    // Подумать над обработкой ошибки
    dispatch(invalidToken());
    console.log(error);
  }
};

export const isLogout = (dispatch) => () => {
  dispatch(userLogout());
  dispatch(clearCart());
  localStorage.removeItem('userData');
};
