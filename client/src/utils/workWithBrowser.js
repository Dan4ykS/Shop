export const findNeedElements = (selector) => {
  return document.querySelectorAll(selector);
};

export const findNeedElement = (selector) => {
  return document.querySelector(selector);
};

export const feedbackMouseLeave = () => {
  findNeedElements('.helperIcon').forEach((el) => {
    el.classList.remove('helperIcon_active');
    el.childNodes.forEach((el) => {
      el.classList.remove('fab_active');
    });
    setTimeout(() => el.classList.add('hidenElem'), 500);
  });
};

export const feedbackMouseEnter = () => {
  findNeedElements('.helperIcon').forEach(async (el) => {
    el.classList.remove('hidenElem');
    await new Promise((resolv) => setTimeout(() => el.classList.add('helperIcon_active'), 200));
    el.childNodes.forEach((el) => {
      el.classList.add('fab_active');
    });
  });
};

export const showFooterHidenElements = () => {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 298) {
      findNeedElement('footer .feedback').classList.remove('hidenElem');
      findNeedElement('footer .upArrow').classList.remove('hidenElem');
    }
    if (window.pageYOffset > 300) {
      findNeedElements('footer .fas').forEach((el) => {
        el.classList.add('fas_active');
      });
    } else {
      findNeedElements('footer .fas').forEach((el) => {
        el.classList.remove('fas_active');
      });
      findNeedElement('footer .feedback').classList.add('hidenElem');
      findNeedElement('footer .upArrow').classList.add('hidenElem');
    }
  });
};

export const toggleSearchForMobile = (e) => {
  const parentNode = e.target.closest('svg'),
    content = findNeedElement('.content'),
    contentPaddingTop = window.getComputedStyle(content).paddingTop;

  parentNode.nextElementSibling.classList.toggle('hidenElem');
  if (contentPaddingTop === '100px') {
    content.style.paddingTop = '70px';
  } else {
    content.style.paddingTop = '100px';
  }
};

export const showMobileSideBar = () => {
  const mobileSideBar = findNeedElement('.mobileSideBar'),
    body = findNeedElement('body'),
    mobileClose = findNeedElement('.mobileSideBar_close');

  mobileSideBar.classList.add('mobileSideBar_active');
  mobileClose.style.display = 'block';
  body.style.overflow = 'hidden';
};

export const closeMobileSideBar = () => {
  const body = findNeedElement('body'),
    mobileSideBar = findNeedElement('.mobileSideBar'),
    mobileSideBarClose = findNeedElement('.mobileSideBar_close');

  mobileSideBar.classList.remove('mobileSideBar_active');
  mobileSideBarClose.style.display = 'none';
  body.style.overflow = 'auto';
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

export const createObjForRequest = (inputs) => {
  const data = {};
  inputs.forEach((el) => {
    data[el.name] = el.value;
  });
  return data;
};

export const createValidImgSrc = (imgSrc) => {
  if (imgSrc.startsWith('uploads')) {
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

export const activateBtn = (btnSelector) => {
  findNeedElement(`${btnSelector}`).removeAttribute('disabled');
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
    body = findNeedElement('body'),
    menu = findNeedElement('nav'),
    activeMenu = findNeedElement('.header_fixed');

  modalWraper.classList.remove('hidenElem');
  modal.classList.remove('hidenElem');
  const scrollbarWidth = +window.innerWidth - +menu.clientWidth;
  if (scrollbarWidth > 0) {
    body.style.marginRight = `${scrollbarWidth}px`;
  }
  if (activeMenu) {
    activeMenu.style.width = `${activeMenu.clientWidth}px`;
  }
  body.style.overflow = 'hidden';

  [modalWraper, modal].forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.dataset.close) {
        modalWraper.classList.add('hidenElem');
        modal.classList.add('hidenElem');
        body.style.overflow = 'auto';
        body.style.marginRight = '0px';
        if (activeMenu) {
          activeMenu.style.width = `100%`;
        }
      }
    });
  });
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
  let inputsIsValid = true;
  inputs.forEach((el) => {
    if (el.classList.contains('isInvalid')) {
      inputsIsValid = false;
    }
  });
  return inputsIsValid;
};

export const setValues = (data) => {
  return !data ? '' : data;
};

export const hidenModal = () => {
  findNeedElement('.modalWraper').classList.add('hidenElem');
  findNeedElement('.modalWindow').classList.add('hidenElem');
};
