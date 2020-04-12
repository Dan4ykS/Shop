import updateBookList from './updateBookList';
import updateShopingCart from './updateShopingCart';
import updateUserData from './updateUserData';
import updateMenuItems from './updateMenuItems';

const reducer = (state, action) => {
  return {
    bookList: updateBookList(state, action),
    shopingCart: updateShopingCart(state, action),
    userData: updateUserData(state, action),
    menuItems: updateMenuItems(state, action),
  };
};

export default reducer;
