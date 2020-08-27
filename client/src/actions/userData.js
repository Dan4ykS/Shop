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
  UPDATE_BOUGHTGOODS,
  UPDATE_USER_REVIEWS,
} from './types';
import { loadPromptFomServer, clearPrompt } from './dataForPrompt';
import { reloadCommodityData } from './commodityData';

const createUser = (userData, token) => createAction(CREATE_NEW_USER, { ...userData, token });

const getAdminData = (adminData) => createAction(GET_ADMIN_DATA, adminData);

const updateUserName = (userName) => createAction(UPDATE_USERNAME, userName);

const updatefullName = (fullName) => createAction(UPDATE_FULLNAME, fullName);

const updateEmail = (email) => createAction(UPDATE_EMAIL, email);

const updateAbout = (about) => createAction(UPDATE_ABOUT, about);

const updateAvatar = (avatar) => createAction(UPDATE_AVATAR, avatar);

const updateAvatarSrc = (avatarSrc) => createAction(UPDATE_AVATARSRC, avatarSrc);

export const updateBoughtGoods = (boughtGoods) => createAction(UPDATE_BOUGHTGOODS, boughtGoods);

export const userLogin = (userData, token) => createAction(LOGIN, { ...userData, token });

export const userLogout = () => createAction(LOGOUT);

export const invalidRoute = () => createAction(INVALID_ROUTE);

export const updateUserReviews = (dataForUpdate) => createAction(UPDATE_USER_REVIEWS, dataForUpdate);

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
      const cart = await GoodsService.loadCart(token),
        countGoods = cart.userCart.reduce((acc, item) => acc + item.copies, 0);

      dispatch(loadCartFromServer({ ...cart, countGoods }));
    } else {
      await loadPromptFomServer(token)(dispatch);
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
    dispatch(loadCartFromServer({ ...cart, countGoods: 0 }));
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
    if (userData.userName === 'admin') {
      await loadPromptFomServer(token)(dispatch);
    }
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
  dispatch(reloadCommodityData());
  dispatch(clearPrompt());
  localStorage.removeItem('userData');
};

export const updateUserData = (newFields, token) => async (dispatch) => {
  try {
    const fieldForUpdate = {},
      funcForDispatch = {
        userName: updateUserName,
        email: updateEmail,
        fullName: updatefullName,
        about: updateAbout,
      };

    for (const key in newFields) {
      if (key === 'avatar' && newFields[key]) {
        dispatch(updateAvatar(newFields.avatar.avatar));
        dispatch(updateAvatarSrc(newFields.avatar.avatarSrc));
        fieldForUpdate.avatar = newFields.avatar.avatar;
        fieldForUpdate.withFiles = true;
        delete newFields.avatar;
      } else if (newFields[key]) {
        fieldForUpdate[key] = newFields[key].trim();
        dispatch(funcForDispatch[key](newFields[key]));
      }
    }
    await UsersService.updateUserData(fieldForUpdate, token);
  } catch (error) {
    console.log(error);
  }
};

// export const updateBoughtGoods = (token) => async (dispatch) => {
//   try {
//     const { boughtGoods } = await UsersService.updateBoughtGoodsData(token);
//     dispatch(updateBoughtGoodsRating(boughtGoods));
//   } catch (error) {
//     console.log(error);
//   }
// };
