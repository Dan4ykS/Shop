const updateUserData = (state, action) => {
  if (state === undefined) {
    return {
      userName: null,
      token: null,
    };
  }
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        userName: action.payload.userName,
        token: action.payload.token,
      };
    case 'CREATE_NEW_USER':
      return {
        userName: action.payload.userName,
        token: action.payload.token,
      };
    case 'USER_LOGOUT':
      return {
        userName: null,
        token: null,
      };
    default:
      return state.userData;
  }
};

export default updateUserData;
