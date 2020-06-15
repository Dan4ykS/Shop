import UsersService from '../services/UsersService';
import { clearInputs, findNeedElements, createObjForRequest, isInvalid, findNeedElement } from './workWithBrowser';

export const workWithUserApi = (e, requestsToApi, selector, history) => {
  e.preventDefault();
  findNeedElement(`${selector} button`).setAttribute('disabled', true);
  const inputs = findNeedElements(`${selector} .formControl`);
  const data = createObjForRequest(inputs);
  requestsToApi(data, { inputs, selector }, history);
};

export const resetPassword = async (e, type, token = null) => {
  e.persist();
  e.preventDefault();
  const inputs = findNeedElements('input');
  const data = createObjForRequest(inputs);
  try {
    if (type === 'req') {
      await UsersService.resetPassword(data);
    } else if (type === 'create') {
      await UsersService.createNewPassword(token, data);
      localStorage.setItem('userData', JSON.stringify({ token }));
    }
    clearInputs(inputs);
    e.target.style.display = 'none';
    findNeedElement('.reset__successMsg').classList.remove('hidenElem')
  } catch (error) {
    clearInputs(inputs);
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
