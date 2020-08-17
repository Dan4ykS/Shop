import {
  LOGIN,
  CREATE_NEW_USER,
  LOGOUT,
  INVALID_ROUTE,
  GET_ADMIN_DATA,
  UPDATE_USERNAME,
  UPDATE_FULLNAME,
  UPDATE_EMAIL,
  UPDATE_ABOUT,
  UPDATE_AVATAR,
  UPDATE_AVATARSRC,
} from '../actions/types';

const updateUserData = (state, action) => {
  if (state === undefined) {
    return {
      fullName: '',
      email: '',
      avatarSrc: null,
      avatar: null,
      about: '',
      userName: '',
      token: null,
      error: null,
      loading: true,
      boughtGoods: [],
      reviews: [],
      adminData: {
        loading: true,
      },
    };
  }

  switch (action.type) {
    case LOGIN:
      return {
        ...state.userData,
        ...action.payload,
        error: null,
        loading: false,
      };

    case CREATE_NEW_USER:
      return {
        ...state.userData,
        ...action.payload,
        error: null,
        loading: false,
      };

    case LOGOUT:
      return {
        adminData: state.userData.adminData,
        userName: null,
        token: null,
        error: null,
        loading: true,
        boughtGoods: [],
        reviews: [],
        name: null,
        surname: null,
        lastName: null,
        email: null,
        avatar: null,
        about: null,
      };

    case INVALID_ROUTE:
      return {
        ...state.userData,
        error: true,
        loading: false,
      };

    case GET_ADMIN_DATA:
      return {
        ...state.userData,
        adminData: {
          loading: false,
          ...action.payload,
        },
      };

    case UPDATE_USERNAME:
      return {
        ...state.userData,
        userName: action.payload,
      };

    case UPDATE_FULLNAME:
      return {
        ...state.userData,
        fullName: action.payload,
      };

    case UPDATE_EMAIL:
      return {
        ...state.userData,
        email: action.payload,
      };

    case UPDATE_ABOUT:
      return {
        ...state.userData,
        about: action.payload,
      };

    case UPDATE_AVATAR:
      return {
        ...state.userData,
        avatar: action.payload,
      };

    case UPDATE_AVATARSRC:
      return {
        ...state.userData,
        avatarSrc: action.payload,
      };

    default:
      return state.userData;
  }
};

export default updateUserData;
