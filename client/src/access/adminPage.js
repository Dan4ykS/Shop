import { defaultActions } from './default';

export const chekAdminAccess = async (localStorageData, isLogin, fetchGoods, history, id = null, fetchCommodity = null) => {
  const errorFunc = (userName) => {
    if (userName !== 'admin' && userName) {
      history.push('/MyAccount/');
    }
  };

  await defaultActions(localStorageData, isLogin, fetchGoods, null, errorFunc);
  
  if (id) {
    await fetchCommodity(id, localStorageData?.token, history);
  }
};
