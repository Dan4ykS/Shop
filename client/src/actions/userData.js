import { clearCart, loadCartFromServer } from './shopingCart';
import { fetchGoodsSuccuess } from './goodsList';
import { isInvalid, redirectToPage, clearInputs } from '../utils/workWithBrowser';
import { setNewToken } from '../utils/workWithApiRequest';

const createUser = (userName, token) => {
  return {
    type: 'CREATE_NEW_USER',
    payload: { userName, token },
  };
};

const resetError = () => {
  return {
    type: 'RESET_ERROR',
  };
};

export const userLogin = (userName, token) => {
  return {
    type: 'USER_LOGIN',
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

const dispatchDataFromApi = (dispatch, cart, goods) => {
  dispatch(loadCartFromServer(cart));
  dispatch(fetchGoodsSuccuess(goods));
};

export const authorization = (dispatch, { usersService, goodsService }) => async (data, Fromm, history) => {
  try {
    const token = await usersService.authUser(data);
    redirectToPage(history, '/');
    dispatch(userLogin(data.userName, token));
    if (data.userName !== 'admin') {
      const cart = await goodsService.loadCart(token);
      const goods = await goodsService.getGoods();
      dispatchDataFromApi(dispatch, cart, goods);
    }
    setNewToken(token);
  } catch (error) {
    isInvalid(Fromm);
    clearInputs(Fromm);
  }
};

export const registration = (dispatch, { usersService, goodsService }) => async (data, Fromm, history) => {
  try {
    const token = await usersService.createUser(data);
    redirectToPage(history, '/');
    dispatch(createUser(data.userName, token));
    const cart = await goodsService.loadCart(token);
    const goods = await goodsService.getGoods();
    dispatchDataFromApi(dispatch, cart, goods);
    setNewToken(token);
  } catch (error) {
    isInvalid(Fromm);
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
    console.log(error);
  }
};

export const isLogout = (dispatch) => () => {
  dispatch(userLogout());
  dispatch(clearCart());
  localStorage.removeItem('userData');
};
