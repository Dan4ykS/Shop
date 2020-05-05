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

const updateCartItems = (cartItems, item, index) => {
  if (index === -1) {
    return [...cartItems, item];
  }
  if (item.copies === 0) {
    return [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
  }
  return [...cartItems.slice(0, index), item, ...cartItems.slice(index + 1)];
};

const updateOrder = (state, bookId, quantity) => {
  const {
      goodsList: { goods },
      shopingCart: { cartItems },
    } = state,
    book = goods.find((book) => book._id === bookId),
    itemIndex = cartItems.findIndex((item) => item.id === bookId),
    item = cartItems[itemIndex],
    newItem = updateCartItem(book, item, quantity),
    totalPrice = updateCartItems(cartItems, newItem, itemIndex).reduce((summ, elem) => summ + elem.price, 0);
  return {
    cartItems: updateCartItems(cartItems, newItem, itemIndex),
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
      cartItems: [],
      totalPrice: 0,
    };
  }

  switch (action.type) {
    case 'LOAD_CART_FROM_SERVER':
      return {
        cartItems: transformCartItems(action.payload.userCart),
        totalPrice: action.payload.totalPrice,
      };
    case 'BOOK_ADD_TO_CART':
      return updateOrder(state, action.payload, 1);
    case 'BOOK_DELETE_FROM_CART':
      return updateOrder(state, action.payload, -1);
    case 'CLEAR_CART':
      return {
        cartItems: [],
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
//     shopingCart: { cartItems },
//     goodsList: { goods },
//   } = state;
//   if (cartItems.length !== 0) {
//     const stateSopingCartBooksId = cartItems.map((item) => item.id);
//     const serverSopingCartBooksId = data.map((item) => item.id);
//     const allId = [...stateSopingCartBooksId, ...serverSopingCartBooksId];
//   }
// };
// case 'FETCH_CARTITEMS_SUCCUESS':
//       return {
//         cartItems: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'FETCH_CARTITEMS_FAILURE':
//       return {
//         cartItems: [],
//         loading: false,
//         error: action.payload,
//       };
