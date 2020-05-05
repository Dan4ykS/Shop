import UsersService from '../services/UsersService';
const usersService = new UsersService();

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

export const workWithUserApi = async (e, func, selector) => {
  e.persist();
  e.preventDefault();
  const data = {};
  const inputs = document.querySelectorAll(`${selector} .form-control`);
  inputs.forEach((el) => {
    data[el.name] = el.value;
  });
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
      // document.querySelector('.showPasswordIcon').style.display = 'block';
    });
  });
};

export const isInvalid = (inputs) => {
  console.log(inputs)
  // document.querySelector('.showPasswordIcon').style.display = 'none';
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

export const reqForResetPassword = async (e) => {
  e.persist();
  e.preventDefault();
  const data = {}
  const inputs = document.querySelectorAll('.form-control');
  inputs.forEach((el) => {
    data[el.name] = el.value;
  });
  console.log(data)
  clearInputs(inputs, true);
  try {
    await usersService.resetPassword(data);
    e.target.style.display = 'none';
    document.querySelector('.reset__successMsg').style.display = 'block';
  } catch (error) {
    console.log(error)
    isInvalid(inputs);
  }
};
