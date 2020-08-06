import GoodsService from '../services/GoodsService';
import UsersService from '../services/UsersService';
import { clearCart, loadCartFromServer } from './shopingCart';
import { fetchGoodsSuccuess } from './goodsList';
import { isInvalid, redirectToPage, clearInputs, activateBtn } from '../utils/workWithBrowser';
import { setNewToken } from '../utils/workWithApiRequests';
import { createAction } from '../utils/workWithRedux';
import { LOGIN, CREATE_NEW_USER, LOGOUT, INVALID_ROUTE, GET_ADMIN_DATA } from './types';

const createUser = (userData, token) => createAction(CREATE_NEW_USER, { ...userData, token });

const getAdminData = (adminData) => createAction(GET_ADMIN_DATA, adminData);

export const userLogin = (userData, token) => createAction(LOGIN, { ...userData, token });

export const userLogout = () => createAction(LOGOUT);

export const invalidRoute = () => createAction(INVALID_ROUTE);

const authErrorHeandler = ({ inputs, selector }) => {
  clearInputs(inputs);
  activateBtn(`${selector} button`);
  isInvalid(inputs);
};

export const authorization = (data, formData, history) => async (dispatch) => {
  try {
    const { token, userData } = await UsersService.authUser(data);
    redirectToPage(history, '/');
    dispatch(userLogin(userData, token));
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
    const { userData, token } = await UsersService.createUser(data);
    redirectToPage(history, '/');
    dispatch(createUser(userData, token));
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
    const { userData, newToken } = await UsersService.checkUserValid(token);
    dispatch(userLogin(userData, newToken));
    setNewToken(newToken);
    return userData.userName;
  } catch (error) {
    dispatch(invalidRoute());
  }
};

export const fetchAdminData = () => async (dispatch) => {
  try {
    const data = await UsersService.getAdminData();
    dispatch(getAdminData(data));
  } catch (error) {
    console.log(error);
  }
};

export const isLogout = () => (dispatch) => {
  dispatch(userLogout());
  dispatch(clearCart());
  localStorage.removeItem('userData');
};
