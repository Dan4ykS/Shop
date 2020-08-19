import { changeArrayElement, removeArrayElement, addArrayElement } from '../utils/workWithRedux';
import { FETCH_CART_SUCCUESS, BOOK_ADD_TO_CART, BOOK_DELETE_FROM_CART, CLEAR_CART } from '../actions/types';

const updateCartItem = (commodity, item = {}, quantity) => {
  const {
    id = commodity.id,
    title = commodity.title,
    copies = 0,
    price = 0,
    imgSrc = commodity.previewImg.previewImgSrc,
    alt = commodity.previewImg.previewImgAlt,
  } = item;
  return {
    id,
    title,
    copies: copies + quantity,
    price: price + quantity * commodity.price,
    imgSrc,
    alt,
  };
};

const updateCartItems = (cart, item, index) => {
  if (index === -1) {
    return addArrayElement(cart, item);
  }
  if (item.copies === 0) {
    return removeArrayElement(cart, index);
  }
  return changeArrayElement(cart, index, item);
};

const updateOrder = (state, commodityId, quantity) => {
  const {
      goodsList: { goods },
      shopingCart: { cart, countGoods },
    } = state,
    commodity = goods.find((commodity) => commodity.id === commodityId),
    itemIndex = cart.findIndex((item) => item.id === commodityId),
    item = cart[itemIndex],
    newItem = updateCartItem(commodity, item, quantity),
    totalPrice = updateCartItems(cart, newItem, itemIndex).reduce((summ, elem) => summ + elem.price, 0);

  return {
    cart: updateCartItems(cart, newItem, itemIndex),
    totalPrice,
    updatedPrice: cart.updatedPrice,
    countGoods: countGoods + quantity,
  };
};

const updateShopingCart = (state, action) => {
  if (state === undefined) {
    return {
      cart: [],
      totalPrice: 0,
      loading: true,
      updatedPrice: false,
      countGoods: 0,
    };
  }

  switch (action.type) {
    case FETCH_CART_SUCCUESS:
      return {
        cart: action.payload.userCart,
        totalPrice: action.payload.totalPrice,
        loading: false,
        updatedPrice: action.payload.updatedPrice,
        countGoods: action.payload.countGoods,
      };
    case BOOK_ADD_TO_CART:
      return updateOrder(state, action.payload, 1);

    case BOOK_DELETE_FROM_CART:
      return updateOrder(state, action.payload, -1);

    case CLEAR_CART:
      return {
        ...state.shopingCart,
        cart: [],
        totalPrice: 0,
      };

    default:
      return state.shopingCart;
  }
};

export default updateShopingCart;
