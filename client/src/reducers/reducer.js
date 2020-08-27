import updateGoodsList from './updateGoodsList';
import updateShopingCart from './updateShopingCart';
import updateUserData from './updateUserData';
import updateCommodityData from './updateCommodityData';
import updateDataForPrompt from './updateDataForPrompt';

const reducer = (state, action) => {
  return {
    goodsList: updateGoodsList(state, action),
    shopingCart: updateShopingCart(state, action),
    userData: updateUserData(state, action),
    commodityData: updateCommodityData(state, action),
    dataForPrompt: updateDataForPrompt(state, action)
  };
};

export default reducer;
