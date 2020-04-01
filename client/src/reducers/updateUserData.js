const updateUserData = (state, action) => {
  if (state === undefined) {
    return {
      isAuth: false,
      userName: null,
      token: null
    };
  }
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        isAuth: true,
        userName: action.payload.userName,
        token: action.payload.token,
      };
    case 'CREATE_NEW_USER':
      return {
        isAuth: true,
        userName: action.payload.userName,
        token: action.payload.token,
      };
    case 'USER_LOGOUT':
      return {
        isAuth: false,
        userName: null,
        token: null,
      }
    default:
      return state.userData;
  }
};

export default updateUserData;
