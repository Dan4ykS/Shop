import UsersService from '../services/UsersService';

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

const findNeedElements = (selector) => {
  return document.querySelectorAll(selector);
};

const createObjForRequest = (inputs) => {
  const data = {};
  inputs.forEach((el) => {
    data[el.name] = el.value;
  });
  return data;
};

export const workWithUserApi = async (e, func, selector) => {
  e.persist();
  e.preventDefault();
  const inputs = findNeedElements(`${selector} .form-control`);
  const data = createObjForRequest(inputs);
  await func(data, inputs);
  const mode = e.target.classList.value === 'registrationForm' ? false : true;
  clearInputs(inputs, mode);
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

export const chekToken = async (userToken, isLogin, loadCart, fetchGoods) => {
  if (!userToken) {
    return;
  }
  const { token } = userToken;
  isLogin(token);
  loadCart(token);
  fetchGoods();
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

export const triggerUploadInput = () => {
  document.querySelector('[name=uploader]').click();
};

export const uploadFile = (file, updateFileDataFunc) => {
  console.log(file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    updateFileDataFunc(file, reader.result);
  };
};

const preventDefault = (e, btn) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = 'none';
};

export const preventDefaultFaileUpload = () => {
  const body = document.body;
  body.addEventListener('drag', () => console.log('драг'));
  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    body.addEventListener(eventName, preventDefault);
  });
};

export const removePreventDefault = () => {
  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefault);
  });
};

export const dragAndDropForFile = (updateFileDataFunc) => {
  const fileUploader = document.querySelector('.fileUploader'),
    uploaderBtn = document.querySelector('.fileUploader button'),
    body = document.body,
    dndText = document.querySelector('.fileUploader__dndText');
  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    fileUploader.addEventListener(eventName, preventDefault);
  });
  ['dragenter', 'dragover'].forEach((eventName) => {
    fileUploader.addEventListener(eventName, (e) => {
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
      fileUploader.style.border = '2px dashed black';
      uploaderBtn.classList.add('hidenElem');
      dndText.classList.remove('hidenElem');
    });
  });

  ['dragenter', 'dragover'].forEach((eventName) => {
    body.addEventListener(eventName, (e) => {
      uploaderBtn.classList.add('hidenElem');
      dndText.classList.remove('hidenElem');
      fileUploader.style.border = '2px dashed black';
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    body.addEventListener(eventName, (e) => {
      uploaderBtn.classList.remove('hidenElem');
      dndText.classList.add('hidenElem');
      fileUploader.style.border = 'none';
    });
  });

  fileUploader.addEventListener('drop', (e) => {
    uploadFile(e.dataTransfer.files[0], updateFileDataFunc);
    uploaderBtn.classList.remove('hidenElem');
    dndText.classList.add('hidenElem');
    fileUploader.style.border = 'none';
  });
};
