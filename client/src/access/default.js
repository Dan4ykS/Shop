export const defaultActions = async (token, isLogin, fetchGoods, loadCart = undefined, errorFunc = undefined) => {
  if (!token) {
    await isLogin(token);
    return;
  }

  const userName = await isLogin(token);
  if (errorFunc) {
    errorFunc(userName);
  }

  await fetchGoods(0, 8);

  if (loadCart) {
    await loadCart(token);
  }
};
