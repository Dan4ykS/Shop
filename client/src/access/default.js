export const defaultActions = async (localStorageData, isLogin, fetchGoods, loadCart = undefined, errorFunc = undefined) => {
  if (!localStorageData) {
    await isLogin(localStorageData);
    return;
  }

  const { token } = localStorageData;
  const userName = await isLogin(token);
  if (errorFunc) {
    errorFunc(userName);
  }

  await fetchGoods();

  if (loadCart) {
    await loadCart(token);
  }
};
