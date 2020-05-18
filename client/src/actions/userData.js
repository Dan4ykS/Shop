import { clearCart, loadCartFromServer } from './shopingCart';
import { fetchGoodsSuccuess } from './goodsList';
import { isInvalid, redirectToPage } from '../utils/workWithBrowser';
import { setNewToken } from '../utils/workWithApiRequest';

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

export const userLogout = () => {
  return {
    type: 'USER_LOGOUT',
  };
};

export const invalidRoute = () => {
  return {
    type: 'INVALID_ROUTE',
  };
};

const requestsToApi = (dispatch, cart, goods) => {
  dispatch(loadCartFromServer(cart));
  dispatch(fetchGoodsSuccuess(goods));
};

export const authorization = (dispatch, { usersService, goodsService }) => async (data, form, history) => {
  try {
    const token = await usersService.authUser(data);
    dispatch(userLogin(data.userName, token));
    const cart = await goodsService.loadCart(token);
    const goods = await goodsService.getGoods();
    requestsToApi(dispatch, cart, goods);
    redirectToPage(history, '/');
    console.log(token)
    setNewToken(token);
  } catch (error) {
    isInvalid(form);
  }
};

export const registration = (dispatch, { usersService, goodsService }) => async (data, form, history) => {
  try {
    console.log('Функция регистрации вызвалась!')
    const token = await usersService.createUser(data);
    dispatch(createUser(data.userName, token));
    const cart = await goodsService.loadCart(token);
    const goods = await goodsService.getGoods();
    requestsToApi(dispatch, cart, goods);
    redirectToPage(history, '/');
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
    return userName;
  } catch (error) {
    dispatch(invalidRoute());
    console.log(error);
  }
};

export const isLogout = (dispatch) => () => {
  dispatch(userLogout());
  dispatch(clearCart());
  localStorage.removeItem('userData');
};
