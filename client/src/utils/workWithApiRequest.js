import UsersService from '../services/UsersService';
import { clearInputs, findNeedElements, createObjForRequest, isInvalid, findNeedElement, disableBtn, activateBtn } from './workWithBrowser';
import GoodsService from '../services/GoodsService';

export const authRequests = (e, requestsToApi, selector, history) => {
  e.preventDefault();
  disableBtn(`${selector} button`)
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
    findNeedElement('.reset__successMsg').classList.remove('hidenElem');
  } catch (error) {
    clearInputs(inputs);
    isInvalid(inputs);
  }
};

const createObjForUpdateCommodity = (data) => {
  if (data?.img || data?.previewImg) {
    const previewImg = data.previewImg?.previewImgFile;
    const img = data.img?.imgFile;
    const previewImgAlt = data.previewImg?.previewImgAlt;
    const imgAlt = data.img?.imgAlt;
    const previewImgId = data.previewImg?.previewImgId;
    const imgId = data.img?.imgId;
    delete data?.img;
    delete data?.previewImg;
    const obj = {
      ...data,
      withFiles: true,
      previewImg,
      img,
      previewImgAlt,
      imgAlt,
      previewImgId,
      imgId,
    };
    for (const key in obj) {
      if (!obj[key]) {
        delete obj[key];
      }
    }
    return obj;
  }
  return {
    ...data,
  };
};

export const updateCommodityData = async (e, updatedFields, token, type, commodityId) => {
  e.persist();
  e.preventDefault();
  disableBtn('.changeCommodityDetail button');
  const objForRequest = createObjForUpdateCommodity(updatedFields);
  if (type === 'update') {
    try {
      await GoodsService.updateCommodity(commodityId, objForRequest, token);
      alert(`Товар с ID:${commodityId}`);
    } catch (error) {
      alert(`Ошибка создания товара с ID:${commodityId}`);
    }
  } else {
    try {
      await GoodsService.createCommodity(objForRequest, token);
      alert(`Создан товар с названием ${objForRequest.title}`);
    } catch (error) {
      alert(`Ошибка создания товара с названием ${objForRequest.title}`);
    }
  }
  activateBtn('.changeCommodityDetail button');
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
