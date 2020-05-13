import { isInvalid, setNewToken } from '../utils/helpFuncsForBrouser';
import { clearCart, loadCartFromServer } from './shopingCart';
import { fetchGoodsSuccuess } from './goodsList';

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

const requestsToApi = (dispatch, cart, goods) => {
  dispatch(loadCartFromServer(cart));
  dispatch(fetchGoodsSuccuess(goods));
};

export const authorization = (dispatch, { usersService, goodsService }) => async (data, form) => {
  try {
    const token = await usersService.authUser(data);
    dispatch(userLogin(data.userName, token));
    const cart = await goodsService.loadCart(token);
    const goods = await goodsService.getGoods();
    requestsToApi(dispatch, cart, goods);
    setNewToken(token);
  } catch (error) {
    isInvalid(form);
  }
};

export const registration = (dispatch, { usersService, goodsService }) => async (data, form) => {
  try {
    const token = await usersService.createUser(data);
    dispatch(createUser(data.userName, token));
    const cart = await goodsService.loadCart(token);
    const goods = await goodsService.getGoods();
    requestsToApi(dispatch, cart, goods);
    setNewToken(token);
  } catch (error) {
    isInvalid(form);
  }
};

export const isLogin = (dispatch, { usersService }) => async (token) => {
  try {
    const { userName, newToken } = await usersService.checkUserValid(token);
    dispatch(userLogin(userName, newToken));
    setNewToken(newToken);
  } catch (error) {
    dispatch(invalidToken());
    console.log(error);
  }
};

export const isLogout = (dispatch) => () => {
  dispatch(userLogout());
  dispatch(clearCart());
  localStorage.removeItem('userData');
};
