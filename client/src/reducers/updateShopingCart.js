import { changeArrayElement, removeArrayElement } from '../utils/workWithRedux';

const updateCartItem = (book, item = {}, quantity) => {
  const { id = book._id, title = book.title, copies = 0, price = 0, img = book.previewImg } = item;
  return {
    id,
    title,
    copies: copies + quantity,
    price: price + quantity * book.price,
    img,
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
    book = goods.find((book) => book._id === bookId),
    itemIndex = cart.findIndex((item) => item.id === bookId),
    item = cart[itemIndex],
    newItem = updateCartItem(book, item, quantity),
    totalPrice = updateCartItems(cart, newItem, itemIndex).reduce((summ, elem) => summ + elem.price, 0);
  return {
    cart: updateCartItems(cart, newItem, itemIndex),
    totalPrice,
  };
};

const transformCartItems = (userCart) => {
  return userCart.map((item) => {
    return {
      ...item,
      id: item._id,
      img: item.previewImg,
    };
  });
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
        cart: transformCartItems(action.payload.userCart),
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

// Добавить поддержку загрузки данных из корзины (подумать над реализацией синхронизации товаров в state и с сервера)
// const loadingCartItems = (state, data) => {
//   const {
//     shopingCart: { cart },
//     goodsList: { goods },
//   } = state;
//   if (cart.length !== 0) {
//     const stateSopingCartBooksId = cart.map((item) => item.id);
//     const serverSopingCartBooksId = data.map((item) => item.id);
//     const allId = [...stateSopingCartBooksId, ...serverSopingCartBooksId];
//   }
// };
// case 'FETCH_CARTITEMS_SUCCUESS':
//       return {
//         cart: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'FETCH_CARTITEMS_FAILURE':
//       return {
//         cart: [],
//         loading: false,
//         error: action.payload,
//       };
