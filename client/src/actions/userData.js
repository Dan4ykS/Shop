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

export const authorization = (dispatch, { usersService }) => (data, form) => {
  usersService
    .authUser(data)
    .then((response) => response.json())
    .then((respData) => {
      dispatch(userLogin(data.userName, respData.token));
      localStorage.setItem('userData', JSON.stringify(respData));
    })
    .catch((err) => isInvalid(form));
};

export const registration = (dispatch, { usersService }) => (data, form) => {
  usersService
    .createNewUser(data)
    .then((response) => response.json())
    .then((respData) => {
      dispatch(createUser(data.userName, respData.token));
      localStorage.setItem('userData', JSON.stringify(respData));
    })
    .catch((err) => console.log(err));
};

export const isLogin = (dispatch) => (userName, token) => {
  dispatch(userLogin(userName, token));
};

export const isLogout = (dispatch) => () => {
  dispatch(userLogout());
  localStorage.removeItem('userData');
};
