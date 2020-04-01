import updateBookList from './updateBookList';
import updateShopingCart from './updateShopingCart';
import updateUserData from './updateUserData';

const reducer = (state, action) => {
  return {
    bookList: updateBookList(state, action),
    shopingCart: updateShopingCart(state, action),
    userData: updateUserData(state, action),
  };
};

export default reducer;
