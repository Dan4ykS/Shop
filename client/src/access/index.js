import { chekAccessToAuthPages } from './authPages';
import { chekAdminAccess } from './adminPage';
import { chekAccessToResetPasswordPage } from './resetPasswordPage';
import { defaultActions } from './default';
import { findPathParams } from '../utils/workWithBrowser';

export const chekAccess = async (localStorageData, actions, history) => {
  console.log(actions);
  const { isLogin, loadCart, fetchGoods, fetchCommodity, h } = actions;
  console.log(isLogin, h);
  let path = history.location.pathname.slice(1),
    params;

  if (path.match(/[0-9]/)) {
    params = findPathParams(history);
    path = path.replace(params, 'params');
  }

  switch (path) {
    case 'Registration':
    case 'Registration/':
    case 'Login':
    case 'Login/':
      await chekAccessToAuthPages(history, localStorageData?.token, isLogin, fetchGoods, loadCart);
      break;

    case 'admin/updateCommodity/params':
    case 'admin/updateCommodity/params/':
      await chekAdminAccess(localStorageData?.token, isLogin, fetchGoods, history, loadCart, params, fetchCommodity);
      break;

    case 'admin/createCommodity/':
    case 'admin/createCommodity':
    case 'admin/':
    case 'admin':
      await chekAdminAccess(localStorageData?.token, isLogin, fetchGoods, history, loadCart);
      break;

    case 'resetPassword/params':
    case 'resetPassword/params/':
      const token = params.split('=')[1];
      await chekAccessToResetPasswordPage(token, isLogin, fetchGoods, loadCart);
      break;

    default:
      await defaultActions(localStorageData?.token, isLogin, fetchGoods, loadCart);
      break;
  }
};
// /admin/updateCommodity/5e84c883e2286534184940dc/
