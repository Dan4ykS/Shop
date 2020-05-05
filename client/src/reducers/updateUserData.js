const updateUserData = (state, action) => {
  if (state === undefined) {
    return {
      userName: null,
      token: null,
      error: null,
    };
  }
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        userName: action.payload.userName,
        token: action.payload.token,
        error: null,
      };
    case 'CREATE_NEW_USER':
      return {
        userName: action.payload.userName,
        token: action.payload.token,
        error: null,
      };
    case 'USER_LOGOUT':
      return {
        userName: null,
        token: null,
        error: null,
      };
    case 'INVALID_TOKEN':
      return {
        ...state.userData,
        error: true,
      };
    default:
      return state.userData;
  }
};

export default updateUserData;
