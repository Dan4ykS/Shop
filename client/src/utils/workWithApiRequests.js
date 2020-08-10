import UsersService from '../services/UsersService';
import {
  clearInputs,
  findNeedElements,
  createObjForRequest,
  isInvalid,
  findNeedElement,
  disableBtn,
  activateBtn,
  redirectToPage,
  scrollToElem,
  hidenModal,
  scrollToTop,
} from './workWithBrowser';
import GoodsService from '../services/GoodsService';

export const authRequests = (e, requestsToApi, selector, history) => {
  e.preventDefault();
  disableBtn(`${selector} button`);
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
    findNeedElement('.reset__successMsg').classList.remove('hiddenElem');
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

export const workWithCommodityData = async (e, updatedFields, token, type, commodityId, history) => {
  e.persist();
  e.preventDefault();
  disableBtn('.changeCommodityDetail__btn');
  const objForRequest = createObjForUpdateCommodity(updatedFields);
  if (type === 'update') {
    try {
      await GoodsService.updateCommodity(commodityId, objForRequest, token);
      alert(`Товар с ID:${commodityId} обновлен`);
      activateBtn('.changeCommodityDetail__btn');
    } catch (error) {
      alert(`Ошибка создания товара с ID:${commodityId}`);
    }
  } else {
    try {
      await GoodsService.createCommodity(objForRequest, token);
      scrollToElem('header');
      redirectToPage(history, '/admin');
      alert(`Создан товар с названием ${objForRequest.title}`);
    } catch (error) {
      alert(`Ошибка создания товара с названием ${objForRequest.title}`);
    }
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

export const deleteCommodity = async (id, token, history) => {
  try {
    await GoodsService.removeCommodity(id, token);
    hidenModal();
    scrollToElem('header');
    redirectToPage(history, '/admin');
  } catch (error) {
    alert(`Ошибка при удалении книги с id:${id}`);
  }
};

export const findGoods = async (e, history, queryForSearch, funcForSearch) => {
  e.persist();
  e.preventDefault();
  const path = `/Goods/serch=${queryForSearch}`;
  if (history.location.pathname !== path && queryForSearch.trim()) {
    history.push(path);
    scrollToTop();
    await funcForSearch({ strForSearch: queryForSearch, type: 'search' });
  }
};

export const workWithReview = async (
  e,
  { review, commodityId, userReview },
  { token, avatar, name, userName },
  { updateReviews, updateUserReview, changeLoading, clearUserReview, removeReview, updateRating }
) => {
  e.persist();
  e.preventDefault();
  const form = e.target,
    feedbackWrapper = form.childNodes[0],
    feedbacStatus = form.childNodes[1],
    toRemove = form.dataset.remove;

  changeLoading(true);
  feedbackWrapper.classList.add('commodityPage__feedback-contentWrapper_hiden');
  feedbacStatus.classList.remove('hiddenElem');
  if (toRemove !== 'false') {
    await GoodsService.removeReview(userReview.reviewId, token);
    updateRating(0, userReview?.rating);
    clearUserReview();
    removeReview({ reviewId: userReview.reviewId });
  } else if (userReview?.reviewId) {
    const { date } = await GoodsService.updateReview(userReview.reviewId, { review }, token);
    updateUserReview({ review, reviewWasUpdate: userReview?.review ? true : false });
    updateReviews({ review, reviewDate: date, reviewId: userReview.reviewId });
  } else {
    const { id, date } = await GoodsService.createReview({ review, commodityId }, token);
    updateUserReview({ review, reviewId: id });
    updateReviews({
      reviewId: id,
      reviewDate: date,
      reviewerName: name,
      reviewerAvatar: avatar,
      reviewer: userName,
      review,
    });
  }
  if (toRemove) {
    form.dataset.remove = false;
  }

  changeLoading(false);
};
