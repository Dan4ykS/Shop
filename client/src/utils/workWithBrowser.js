export const findNeedElements = (selector) => {
  return document.querySelectorAll(selector);
};

export const findNeedElement = (selector) => {
  return document.querySelector(selector);
};

export const scrollToElem = (updateImgComp) => {
  findNeedElement(`.${updateImgComp}`).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

export const scrollToTop = () => {
  window.scrollTo({ behavior: 'smooth', top: [0, 0] });
};

export const redirectToLink = (link) => {
  window.open(link);
};

export const disableBtn = (btnSelector) => {
  findNeedElement(`${btnSelector}`).setAttribute('disabled', true);
};

export const activateBtn = (btnSelector) => {
  findNeedElement(`${btnSelector}`).removeAttribute('disabled');
};

export const createObjForRequest = (inputs) => {
  const data = {};
  inputs.forEach((el) => {
    data[el.name] = el.value;
  });
  return data;
};

export const createValidImgSrc = (imgSrc) => {
  if (imgSrc.startsWith('uploads') || imgSrc.startsWith('static')) {
    return `/${imgSrc}`;
  }
  return imgSrc;
};

export const clearInputs = (inputs) => {
  inputs.forEach((el) => {
    el.value = '';
    el.addEventListener('focus', () => {
      inputs.forEach((el) => el.classList.remove('isInvalid'));
      const showPasswordElement = findNeedElement('.showPasswordIcon');
      if (showPasswordElement !== null) {
        showPasswordElement.style.display = 'block';
      }
    });
  });
};

export const isInvalid = (inputs) => {
  const showPasswordElement = findNeedElement('.showPasswordIcon');
  if (showPasswordElement) {
    showPasswordElement.style.display = 'none';
  }
  inputs.forEach((el) => el.classList.add('isInvalid'));
};

export const changePasswordType = (iconSelector, inputSelector) => {
  const icon = findNeedElement(iconSelector);
  const input = findNeedElement(inputSelector);
  if (icon.classList.contains(`${iconSelector.split('.')[1]}_crosOut`)) {
    icon.classList.remove(`${iconSelector.split('.')[1]}_crosOut`);
    input.type = 'text';
  } else {
    icon.classList.add(`${iconSelector.split('.')[1]}_crosOut`);
    input.type = 'password';
  }
};

export const redirectToPage = (history, page) => {
  history.push(page);
};

export const findPathParams = (history) => {
  return history.location.pathname.split('/').find((el) => el.match(/[0-9]/));
};

export const getDateFromLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

export const logOut = (func, history) => {
  redirectToPage(history, '/');
  func();
};

export const initModalWindow = (modalSelector) => {
  const modalWraper = findNeedElement('.modalWraper'),
    modal = findNeedElement(`${modalSelector}`),
    body = findNeedElement('body');

  modalWraper.classList.remove('hidenElem');
  modal.classList.remove('hidenElem');

  body.style.overflow = 'hidden';

  [modalWraper, modal].forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.dataset.close) {
        modalWraper.classList.add('hidenElem');
        modal.classList.add('hidenElem');
        body.style.overflow = 'auto';
        body.style.marginRight = '0px';
      }
    });
  });
};

export const hidenModal = () => {
  findNeedElement('.modalWraper').classList.add('hidenElem');
  findNeedElement('.modalWindow').classList.add('hidenElem');
};

export const validateInput = (e, updateFunction, validationCondition = null) => {
  const input = e.target;
  if ((validationCondition && !validationCondition(input)) || !input.value.trim()) {
    input.classList.add('isInvalid');
    updateFunction(input.value);
    return;
  }
  updateFunction(input.value);
  input.classList.remove('isInvalid');
};

export const chekValidDataInForm = (formSelector) => {
  const inputs = findNeedElements(`${formSelector} .formControl`);
  for (const input of inputs) {
    if (input.classList.contains('isInvalid')) {
      return false;
    }
  }
  return true;
};
