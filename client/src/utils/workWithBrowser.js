export const findNeedElements = (selector) => document.querySelectorAll(selector);

export const findNeedElement = (selector) => document.querySelector(selector);

export const scrollToElem = (selector) => {
  findNeedElement(`.${selector}`).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

export const scrollToTop = () => window.scrollTo(0, 0);

export const smoothScrollToTop = () => window.scrollTo({ behavior: 'smooth', top: [0, 0] });

export const redirectToLink = (link) => window.open(link);

export const disableBtn = (btnSelector) => findNeedElement(`${btnSelector}`).setAttribute('disabled', true);

export const activateBtn = (btnSelector) => findNeedElement(`${btnSelector}`).removeAttribute('disabled');

export const createObjForRequest = (inputs) => {
  const data = {};
  inputs.forEach((el) => {
    data[el.name] = el.value;
  });
  return data;
};

export const createValidImgSrc = (imgSrc) => {
  if (!imgSrc) {
    return '';
  } else if (imgSrc.startsWith('uploads') || imgSrc.startsWith('static')) {
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

export const redirectToPage = (history, page) => history.push(page);

export const findPathParams = (history) => history.location.pathname.split('/').find((el) => el.match(/[0-9]/));

export const getDateFromLocalStorage = (name) => JSON.parse(localStorage.getItem(name));

export const initModalWindow = (modalSelector) => {
  const modalWraper = findNeedElement('.modalWraper'),
    modal = findNeedElement(`${modalSelector}`),
    body = findNeedElement('body');

  modalWraper.classList.remove('hiddenElem');
  modal.classList.remove('hiddenElem');

  body.style.overflow = 'hidden';

  [modalWraper, modal].forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.dataset.close) {
        modalWraper.classList.add('hiddenElem');
        modal.classList.add('hiddenElem');
        body.style.overflow = 'auto';
        body.style.marginRight = '0px';
      }
    });
  });
};

export const hidenModal = () => {
  findNeedElement('.modalWraper').classList.add('hiddenElem');
  findNeedElement('.modalWindow').classList.add('hiddenElem');
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

// export const timer
