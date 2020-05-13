const updateMenu = (userName) => {
  return {
    type: 'UPDATE_ITEMS',
    payload: userName,
  };
};

const notUpdate = () => {
  return {
    type: 'NOT_UPDATE',
  };
};
export const updateTopHeaderMenu = (dispatch) => (userName) => {
  dispatch(updateMenu(userName));
  setTimeout(() => dispatch(notUpdate()), 500);
};
