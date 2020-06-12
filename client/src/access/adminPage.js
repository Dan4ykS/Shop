export const chekAdminAccess = async (localStorageData, isLogin, history, id = null, fetchCommodity = null) => {
  console.log(id);
  if (!localStorageData) {
    console.log('Нет токена');
    await isLogin(localStorageData);
    return;
  }
  const {token } = localStorageData 
  const userName = await isLogin(token);
  if (userName !== 'admin' && userName) {
    history.push('/MyAccount/');
  }
  if (id) {
    await fetchCommodity(id, token, history);
  }
};
