import UsersService from '../services/UsersService';
import { clearInputs, findNeedElements, createObjForRequest, isInvalid, redirectToPage } from './workWithBrowser';

export const workWithUserApi = async (e, func, selector, history) => {
  e.persist();
  e.preventDefault();
  const inputs = findNeedElements(`${selector} .form-control`);
  const data = createObjForRequest(inputs);
  await func(data, inputs, history);
  const mode = e.target.classList.value === 'registrationForm' ? false : true;
  clearInputs(inputs, mode);
};

export const chekAccesss = async (userToken, isLogin, loadCart, fetchGoods, invalidRoute, history) => {
  try {
    const { token } = userToken;
    const userName = await isLogin(token);
    if (userName !== 'admin') {
      console.log(history);
      if (history.location.pathname === '/admin') {
        history.push('/MyAccount/');
      }
      await loadCart(token);
      await fetchGoods();
    } else {
      console.log(history);
    }
  } catch (error) {
    console.log(history);
    invalidRoute();
  }
  // if (!userToken) {
  //   return;
  // }
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

// export const chekUser = async (userToken, isLogin, loadCart, fetchGoods, userName) => {
//   if (!userName) {
//     if (!userToken) {
//       // console.log('a')
//       // await isLogin(userToken);
//     }
//   }
// };

export const chekAdmin = async (userToken, userName, isLogin, userLogin, invalidRoute, history) => {
  if (!userName) {
    // if (!userToken) {
    //   await isLogin(userToken);
    // } else {
    //   const { token } = userToken;
    //   try {
    //     const { userName } = await UsersService.checkUserValid(token);
    //     console.log(userName);
    //     if (userName !== 'admin') {
    //       console.log('Перенаправление!');
    //       redirectToPage(history, '/MyAccount/');
    //       return;
    //     }
    //     userLogin(userName, token);
    //   } catch (error) {
    //     invalidRoute();
    //     console.log(error);
    //   }
    // }
  }
};
