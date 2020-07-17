import { LOGIN, CREATE_NEW_USER, LOGOUT, INVALID_ROUTE } from "../actions/types";

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
    case LOGIN:
      return {
        userName: action.payload.userName,
        token: action.payload.token,
        error: null,
        loading: false,
      };

    case CREATE_NEW_USER:
      return {
        userName: action.payload.userName,
        token: action.payload.token,
        error: null,
        loading: false,
      };

    case LOGOUT:
      return {
        userName: null,
        token: null,
        error: null,
        loading: true,
      };

    case INVALID_ROUTE:
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
