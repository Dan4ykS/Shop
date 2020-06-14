import { changeArrayElement, removeArrayElement } from '../utils/workWithRedux';

const updateCartItem = (book, item = {}, quantity) => {
  const { id = book.id, title = book.title, copies = 0, price = 0, imgSrc = book.previewImgSrc } = item;
  return {
    id,
    title,
    copies: copies + quantity,
    price: price + quantity * book.price,
    imgSrc,
  };
};

const updateCartItems = (cart, item, index) => {
  if (index === -1) {
    return [...cart, item];
  }
  if (item.copies === 0) {
    return removeArrayElement(cart, index);
  }
  return changeArrayElement(cart, index, item);
};

const updateOrder = (state, bookId, quantity) => {
  const {
      goodsList: { goods },
      shopingCart: { cart },
    } = state,
    book = goods.find((book) => book.id === bookId),
    itemIndex = cart.findIndex((item) => item.id === bookId),
    item = cart[itemIndex],
    newItem = updateCartItem(book, item, quantity),
    totalPrice = updateCartItems(cart, newItem, itemIndex).reduce((summ, elem) => summ + elem.price, 0);
  return {
    cart: updateCartItems(cart, newItem, itemIndex),
    totalPrice,
  };
};

const updateShopingCart = (state, action) => {
  if (state === undefined) {
    return {
      cart: [],
      totalPrice: 0,
      loading: true,
    };
  }

  switch (action.type) {
    case 'LOAD_CART_FROM_SERVER':
      return {
        cart: action.payload.userCart,
        totalPrice: action.payload.totalPrice,
        loading: false
      };
    case 'BOOK_ADD_TO_CART':
      return updateOrder(state, action.payload, 1);
    case 'BOOK_DELETE_FROM_CART':
      return updateOrder(state, action.payload, -1);
    case 'CLEAR_CART':
      return {
        cart: [],
        totalPrice: 0,
      };
    default:
      return state.shopingCart;
  }
};

export default updateShopingCart;
