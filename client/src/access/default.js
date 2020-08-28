export const defaultActions = async (token, isLogin, fetchGoods, loadCart = undefined, errorFunc = undefined) => {
  if (!token) {
    await isLogin(token);
    return;
  }

  const userName = await isLogin(token);
  if (errorFunc) {
    errorFunc(userName);
  }

  if (loadCart && userName !== 'admin') {
    await loadCart(token);
  }
};
