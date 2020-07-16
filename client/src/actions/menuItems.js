import { createAction } from "../utils/workWithRedux";

const updateMenu = (userName) => createAction('UPDATE_ITEMS', userName)

const notUpdate = () => createAction('NOT_UPDATE') 

export const updateTopHeaderMenu = (userName) => (dispatch) => {
  dispatch(updateMenu(userName));
  setTimeout(() => dispatch(notUpdate()), 500);
};
