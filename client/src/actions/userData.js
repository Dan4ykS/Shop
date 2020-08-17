import GoodsService from '../services/GoodsService';
import UsersService from '../services/UsersService';
import { clearCart, loadCartFromServer } from './shopingCart';
import { fetchGoodsSuccuess } from './goodsList';
import { isInvalid, redirectToPage, clearInputs, activateBtn } from '../utils/workWithBrowser';
import { setNewToken } from '../utils/workWithApiRequests';
import { createAction } from '../utils/workWithRedux';
import {
  LOGIN,
  CREATE_NEW_USER,
  LOGOUT,
  INVALID_ROUTE,
  GET_ADMIN_DATA,
  UPDATE_USERNAME,
  UPDATE_FULLNAME,
  UPDATE_EMAIL,
  UPDATE_ABOUT,
  UPDATE_AVATAR,
  UPDATE_AVATARSRC,
} from './types';

const createUser = (userData, token) => createAction(CREATE_NEW_USER, { ...userData, token });

const getAdminData = (adminData) => createAction(GET_ADMIN_DATA, adminData);

const updateUserName = (userName) => createAction(UPDATE_USERNAME, userName);

const updatefullName = (fullName) => createAction(UPDATE_FULLNAME, fullName);

const updateEmail = (email) => createAction(UPDATE_EMAIL, email);

const updateAbout = (about) => createAction(UPDATE_ABOUT, about);

const updateAvatar = (avatar) => createAction(UPDATE_AVATAR, avatar);

const updateAvatarSrc = (avatarSrc) => createAction(UPDATE_AVATARSRC, avatarSrc);

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
    dispatch(userLogin({ ...userData, avatar: null, avatarSrc: userData.avatar }, token));
    if (data.userName !== 'admin') {
      const cart = await GoodsService.loadCart(token);
      dispatch(loadCartFromServer(cart));
    }
    const goods = await GoodsService.getBestGoods(0, 7);
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
    dispatch(createUser({ ...userData, avatar: null, avatarSrc: userData.avatar }, token));
    const cart = await GoodsService.loadCart(token);
    const goods = await GoodsService.getBestGoods(0, 7);
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
    dispatch(userLogin({ ...userData, avatar: null, avatarSrc: userData.avatar }, newToken));
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

export const updateUserData = (newFields, token) => async (dispatch) => {
  try {
    const fieldForUpdate = {};
    for (const key in newFields) {
      if (key === 'userName' && newFields[key]) {
        dispatch(updateUserName(newFields[key]));
        fieldForUpdate.userName = newFields[key];
      } else if (key === 'email' && newFields[key]) {
        dispatch(updateEmail(newFields[key]));
        fieldForUpdate.email = newFields[key];
      } else if (key === 'fullName' && newFields[key]) {
        dispatch(updatefullName(newFields[key]));
        fieldForUpdate.fullName = newFields[key];
      } else if (key === 'about' && newFields[key]) {
        dispatch(updateAbout(newFields[key]));
        fieldForUpdate.about = newFields[key];
      } else if (key === 'avatar' && newFields[key]) {
        dispatch(updateAvatar(newFields.avatar.avatar));
        dispatch(updateAvatarSrc(newFields.avatar.avatarSrc));
        fieldForUpdate.avatar = newFields.avatar.avatar;
        console.log(newFields.avatar.avatar);
        fieldForUpdate.withFiles = true;
        delete newFields.avatar;
      }
    }
    await UsersService.updateUserData(fieldForUpdate, token);
  } catch (error) {
    console.log(error);
  }
};
