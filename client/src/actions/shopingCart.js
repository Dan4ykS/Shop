const commodityAddToCart = (bookId) => {
  return {
    type: 'BOOK_ADD_TO_CART',
    payload: bookId,
  };
};

const commodityDeletedFromCart = (bookId) => {
  return {
    type: 'BOOK_DELETE_FROM_CART',
    payload: bookId,
  };
};

export const loadCartFromServer = (cart) => {
  console.log(cart)
  const payload = {
    ...cart,
    userCart: cart.userCart.map((el) => ({
      ...el,
      imgSrc: el.previewImgSrc,
    })),
  };
  return {
    type: 'LOAD_CART_FROM_SERVER',
    payload,
  };
};

export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};

export const onAddedToCart = (dispatch, { goodsService }) => async (id, token) => {
  try {
    dispatch(commodityAddToCart(id));
    await goodsService.addToCart(id, token);
  } catch (error) {
    console.log(error);
  }
};

export const onDeletedFromCart = (dispatch, { goodsService }) => async (id, token) => {
  try {
    dispatch(commodityDeletedFromCart(id));
    await goodsService.removeFormCart(id, token);
  } catch (error) {
    console.log(error);
  }
};

export const loadCart = (dispatch, { goodsService }) => async (token) => {
  try {
    const cart = await goodsService.loadCart(token);
    dispatch(loadCartFromServer(cart));
  } catch (error) {
    console.log(error);
  }
};
