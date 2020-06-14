import { chekAccessToAuthPages } from './authPages';
import { chekAdminAccess } from './adminPage';
import { chekAccessToResetPasswordPage } from './resetPasswordPage';
import { defaultActions } from './default';
import { findId } from '../utils/workWithBrowser';

export const chekAccess = async (localStorageData, isLogin, loadCart, fetchGoods, fetchCommodity, history) => {
  let path = history.location.pathname.slice(1);
  let id;
  if (path.match(/[0-9]/)) {
    id = findId(history);
    path = path.replace(id, 'id');
  }
  switch (path) {
    case 'Registration/':
    case 'Login/':
      await chekAccessToAuthPages(history, localStorageData, isLogin, fetchGoods, loadCart);
      break;

    case 'admin/updateCommodity/id/':
      await chekAdminAccess(localStorageData, isLogin, fetchGoods, history, id, fetchCommodity);
      break;

    case 'admin/createCommodity/':
    case 'admin/':
      await chekAdminAccess(localStorageData, isLogin, fetchGoods, history);
      break;

    case 'resetPassword/':
      await chekAccessToResetPasswordPage(history, isLogin, fetchGoods, loadCart);
      break;

    default:
      await defaultActions(localStorageData, isLogin, fetchGoods, loadCart);
      break;
  }
};
// /admin/updateCommodity/5e84c883e2286534184940dc/
