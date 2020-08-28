import updateGoodsList from './updateGoodsList';
import updateShopingCart from './updateShopingCart';
import updateUserData from './updateUserData';
import updateCommodityData from './updateCommodityData';
import updateDataForPrompts from './updateDataForPrompts';

const reducer = (state, action) => {
  return {
    goodsList: updateGoodsList(state, action),
    shopingCart: updateShopingCart(state, action),
    userData: updateUserData(state, action),
    commodityData: updateCommodityData(state, action),
    dataForPrompts: updateDataForPrompts(state, action)
  };
};

export default reducer;
