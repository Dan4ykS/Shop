import UsersService from '../services/UsersService';
import { clearInputs, findNeedElements, createObjForRequest, isInvalid } from './workWithBrowser';

export const workWithUserApi = (e, requestsToApi, selector, history) => {
  e.preventDefault();
  findNeedElements(`${selector} button`)[0].setAttribute('disabled', true);
  const inputs = findNeedElements(`${selector} .form-control`);
  const data = createObjForRequest(inputs);
  requestsToApi(data, { inputs, selector }, history);
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
