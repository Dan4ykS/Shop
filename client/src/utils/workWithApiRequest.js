import UsersService from '../services/UsersService';
import { clearInputs, findNeedElements, createObjForRequest, isInvalid } from './workWithBrowser';

export const workWithUserApi = (e, requestsToApi, selector, history) => {
  e.preventDefault();
  findNeedElements(`${selector} button`)[0].setAttribute('disabled', true);
  const inputs = findNeedElements(`${selector} .form-control`);
  const data = createObjForRequest(inputs);
  requestsToApi(data, { inputs, selector }, history);
};

const defaultActions = async (userToken, isLogin, loadCart, fetchGoods, extraParams = {}) => {
  const { history = null, routeForRedirect = '/', errorMessage = null } = extraParams;
  if (!userToken) {
    await isLogin(userToken);
    return;
  }
  const { token } = userToken;
  const userName = await isLogin(token);
  console.log(userName);
  if (history) {
    history.push(routeForRedirect);
  }
  if (errorMessage && !userName) {
    alert(errorMessage);
  }
  if (userName !== 'admin') {
    await loadCart(token);
    await fetchGoods();
  }
};

export const chekAccess = async (userToken, isLogin, loadCart, fetchGoods, history) => {
  // console.log(history.location);
  switch (history.location.pathname.split('/')[1]) {
    case 'Registration':
    case 'Login': {
      const extraParams = { history, errorMessage: 'Вы уже зарегистрированы!' };
      await defaultActions(userToken, isLogin, loadCart, fetchGoods, extraParams);
      return;
    }

    case 'admin': {
      const pathParams = history.location.search;
      if (pathParams) {
        console.log(pathParams.split('?')[2]);
        if (pathParams.split('?')[2].split('=')) {
          // alert(`Вы хотите редактировать товар с id=${pathParams.split('?')[2].split('=')[1]}`);
        }
      }

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
