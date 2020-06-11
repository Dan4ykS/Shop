export const defaultActions = async (localStorageData, isLogin, loadCart, fetchGoods, errorFunc = undefined) => {
  if (!localStorageData) {
    await isLogin(localStorageData);
    return;
  }
  const { token } = localStorageData;
  const userName = await isLogin(token);
  console.log(userName);
  if (errorFunc) {
    errorFunc(userName);
  }
  if (userName !== 'admin') {
    await loadCart(token);
    await fetchGoods();
  }
};
