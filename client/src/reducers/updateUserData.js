import { LOGIN, CREATE_NEW_USER, LOGOUT, INVALID_ROUTE, GET_ADMIN_DATA } from '../actions/types';

const updateUserData = (state, action) => {
  if (state === undefined) {
    return {
      fullName: '',
      email: null,
      avatar: null,
      about: '',
      userName: null,
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
    default:
      return state.userData;
  }
};

export default updateUserData;
