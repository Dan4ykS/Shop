const updateTopMenu = (userName) => {
  return {
    type: 'UPDATE_TOPITEMS',
    payload: userName,
  };
};

const notUpdate = () => {
  return {
    type: 'NOT_UPDATE',
  };
};
export const updateTopHeaderMenu = (dispatch) => (userName) => {
  dispatch(updateTopMenu(userName));
  setTimeout(() => dispatch(notUpdate()), 500);
};
