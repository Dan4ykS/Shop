import { chekAccessToAuthPages } from './authPages';
import { chekAdminAccess } from './adminPage';
import { chekAccessToResetPasswordPage } from './resetPasswordPage';
import { defaultActions } from './default';

export const chekAccess = async (localStorageData, isLogin, loadCart, fetchGoods, history) => {
  let path = history.location.pathname.slice(1);
  let id
  if (path.match(/[0-9]/)) {
    id = path.split('/').find((el) => el.match(/[0-9]/));
    path = path.replace(
      id,
      'id'
    );
  }
  switch (path) {
    case 'Registration/':
    case 'Login/':
      await chekAccessToAuthPages(history, localStorageData, isLogin, loadCart, fetchGoods);
      break;

    case 'admin/updateCommodity/id/':
      await chekAdminAccess(localStorageData, isLogin, history, id)
    case 'admin/createCommodity/':
    case 'admin/':
      await chekAdminAccess(localStorageData, isLogin, history);
      break;

    case 'resetPassword/':
      await chekAccessToResetPasswordPage(history, isLogin, loadCart, fetchGoods);
      break;

    default:
      await defaultActions(localStorageData, isLogin, loadCart, fetchGoods);
      break;
  }
};
