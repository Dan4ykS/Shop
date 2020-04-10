import { isInvalid } from '../utils/helpFuncsForBrouser';

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

export const authorization = (dispatch, { usersService }) => async (data, form) => {
  try {
    const token = await usersService.authUser(data);
    dispatch(userLogin(data.userName, token));
    localStorage.setItem('userData', JSON.stringify(token));
  } catch (err) {
    isInvalid(form);
  }
};

export const registration = (dispatch, { usersService }) => async (data, form) => {
  try {
    const token = await usersService.createUser(data);
    dispatch(createUser(data.userName, token));
    localStorage.setItem('userData', JSON.stringify(token));
  } catch (error) {
    isInvalid(form)
  }
};

export const isLogin = (dispatch) => (userName, token) => {
  dispatch(userLogin(userName, token));
};

export const isLogout = (dispatch) => () => {
  dispatch(userLogout());
  localStorage.removeItem('userData');
};
