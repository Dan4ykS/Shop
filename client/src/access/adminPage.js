export const chekAdminAccess = async (localStorageData, isLogin, history, id = null) => {
  console.log(id)
  if (!localStorageData) {
    console.log('Нет токена');
    await isLogin(localStorageData);
    return;
  }
  const userName = await isLogin(localStorageData.token);
  if (id) { 
    
  }
  if (userName !== 'admin' && userName) {
    history.push('/MyAccount/');
  }
};
