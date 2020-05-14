export const feedbackMouseLeave = () => {
  document.querySelectorAll('.helperIcon').forEach((el) => {
    el.classList.remove('helperIcon_active');
    el.childNodes.forEach((el) => {
      el.classList.remove('fab_active');
    });
  });
};

export const feedbackMouseEnter = () => {
  document.querySelectorAll('.helperIcon').forEach((el) => {
    el.classList.add('helperIcon_active');
    el.childNodes.forEach((el) => {
      el.classList.add('fab_active');
    });
  });
};

export const showHidenElements = () => {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 298) {
      document.querySelector('footer .feedback').classList.remove('hidenElem');
      document.querySelector('footer .upArrow').classList.remove('hidenElem');
    }
    if (window.pageYOffset > 300) {
      document.querySelectorAll('footer .fas').forEach((el) => {
        el.classList.add('fas_active');
      });
    } else {
      document.querySelectorAll('footer .fas').forEach((el) => {
        el.classList.remove('fas_active');
      });
      document.querySelector('footer .feedback').classList.add('hidenElem');
      document.querySelector('footer .upArrow').classList.add('hidenElem');
    }
  });
};

export const headerFixMenu = () => {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      document.querySelector('.header__main').classList.add('header_active');
    } else {
      document.querySelector('.header__main').classList.remove('header_active');
    }
  });
};

export const scrollToElem = (elem) => {
  document.querySelector(`.${elem}`).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

export const redirectToLink = (link) => {
  window.open(link);
};

export const findNeedElements = (selector) => {
  return document.querySelectorAll(selector);
};

export const createObjForRequest = (inputs) => {
  const data = {};
  inputs.forEach((el) => {
    data[el.name] = el.value;
  });
  return data;
};

export const clearInputs = (inputs, mode) => {
  inputs.forEach((el) => {
    if (mode) {
      el.value = '';
    }
    el.addEventListener('focus', () => {
      inputs.forEach((el) => el.classList.remove('is-invalid'));
      const showPasswordElement = document.querySelector('.showPasswordIcon');
      if (showPasswordElement !== null) {
        document.querySelector('.showPasswordIcon').style.display = 'block';
      }
    });
  });
};

export const isInvalid = (inputs) => {
  const showPasswordElement = document.querySelector('.showPasswordIcon');
  if (showPasswordElement !== null) {
    document.querySelector('.showPasswordIcon').style.display = 'none';
  }
  inputs.forEach((el) => el.classList.add('is-invalid'));
};

export const changePasswordType = (iconSelector, inputSelector) => {
  const icon = document.querySelector(iconSelector);
  const input = document.querySelector(inputSelector);
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

export const getDateFromLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

export const logOut = (func, history) => {
  redirectToPage(history, '/');
  func();
};

