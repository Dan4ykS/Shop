const updateUserData = (state, action) => {
  if (state === undefined) {
    return {
      userName: null,
      token: null,
      error: null,
      loading: true,
    };
  }
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        userName: action.payload.userName,
        token: action.payload.token,
        error: null,
        loading: false,
      };
    case 'CREATE_NEW_USER':
      return {
        userName: action.payload.userName,
        token: action.payload.token,
        error: null,
        loading: false,
      };
    case 'USER_LOGOUT':
      return {
        userName: null,
        token: null,
        error: null,
        loading: true,
      };
    case 'INVALID_TOKEN':
      return {
        ...state.userData,
        error: true,
        loading: false,
      };
    case 'INVALID_ROUTE':
      return {
        ...state.userData,
        error: true,
        loading: false,
      };
    default:
      return state.userData;
  }
};

export default updateUserData;
