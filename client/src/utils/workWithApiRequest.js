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

const defaultActions = async (userToken, isLogin, loadCart, fetchGoods, extraParams = {}) => {
  const { history = null, routeForRedirect = '/', errorMessage = null } = extraParams;
  if (!userToken) {
    await isLogin(userToken);
    return;
  }
  const { token } = userToken;
  const userName = await isLogin(token);
  if (history) {
    history.push(routeForRedirect);
  }
  if (errorMessage) {
    alert(errorMessage);
  }
  if (userName !== 'admin') {
    await loadCart(token);
    await fetchGoods();
  }
};

export const chekAccess = async (userToken, isLogin, loadCart, fetchGoods, invalidRoute, history, resetError) => {
  switch (history.location.pathname.split('/')[1]) {
    case 'Registration':
    case 'Login': {
      const extraParams = { history, errorMessage: 'Вы уже зарегистрированы!' };
      await defaultActions(userToken, isLogin, loadCart, fetchGoods, extraParams);
      return;
    }

    case 'admin': {
      if (!userToken) {
        console.log(userToken);
        await isLogin(userToken);
        return;
      }
      const userName = await isLogin(userToken.token);
      if (userName !== 'admin') {
        history.push('/MyAccount/');
      }
      return;
    }

    case 'resetPassword': {
      const token = { token: history.location.pathname.split('=')[1] };
      const extraParams = { errorMessage: 'Ваш токен больше не валиден, попробуйте снова!' };
      await defaultActions(token, isLogin, loadCart, fetchGoods, extraParams);
      return;
    }

    default:
      await defaultActions(userToken, isLogin, loadCart, fetchGoods);
  }
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
