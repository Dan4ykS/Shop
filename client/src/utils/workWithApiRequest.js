import UsersService from '../services/UsersService';
import { clearInputs, findNeedElements, createObjForRequest, isInvalid } from './workWithBrowser';

export const workWithUserApi = async (e, func, selector, history) => {
  e.persist();
  e.preventDefault();
  const inputs = findNeedElements(`${selector} .form-control`);
  const data = createObjForRequest(inputs);
  await func(data, inputs, history);
  const mode = e.target.classList.value === 'registrationForm' ? false : true;
  clearInputs(inputs, mode);
};

export const chekToken = async (userToken, isLogin, loadCart, fetchGoods) => {
  if (!userToken) {
    return;
  }
  const { token } = userToken;
  await isLogin(token);
  await loadCart(token);
  await fetchGoods();
};

export const resetPassword = async (e, type, token = null) => {
  e.persist();
  e.preventDefault();
  const inputs = findNeedElements('.form-control');
  const data = createObjForRequest(inputs);
  try {
    if (type === 'req') {
      await UsersService.resetPassword(data);
    } else if (type === 'create') {
      await UsersService.createNewPassword(token, data);
      localStorage.setItem('userData', JSON.stringify({ token }));
    }
    clearInputs(inputs, true);
    e.target.style.display = 'none';
    document.querySelector('.reset__successMsg').style.display = 'block';
  } catch (error) {
    clearInputs(inputs, true);
    isInvalid(inputs);
  }
};

export const setNewToken = (token) => {
  const localStorageUserData = localStorage.getItem('userData');
  if (!localStorageUserData) {
    localStorage.setItem('userData', JSON.stringify({ token }));
    return;
  }
  if (JSON.parse(localStorageUserData).token !== token) {
    localStorage.setItem('userData', JSON.stringify({ token }));
  }
};

export const chekUser = async (userToken, isLogin, loadCart, fetchGoods, userName) => {
  if (!userName) {
    if (!userToken) {
      await isLogin(userToken);
    } else {
      await chekToken(userToken, isLogin, loadCart, fetchGoods);
    }
  }
};

export const chekAdmin = async (userToken, userName, isLogin, loadCart, fetchGoods, invalidRoute) => {
  if (!userName) {
    // console.log(userToken);
    if (!userToken) {
      await isLogin(userToken);
    } else {
      const { token } = userToken;
      // console.log('Запросы на сервер');
      try {
        // console.log(token);
        const { userName: user } = await UsersService.checkUserValid(token);
        // console.log(userName);
        if (user !== 'admin') {
          invalidRoute();
        }
      } catch (error) {
        invalidRoute();
        console.log(error);
      }
    }
  }
};
