import updategoodsList from './updateGoodsList';
import updateShopingCart from './updateShopingCart';
import updateUserData from './updateUserData';
import updateCommodityData from './updateCommodityData';

const reducer = (state, action) => {
  return {
    goodsList: updategoodsList(state, action),
    shopingCart: updateShopingCart(state, action),
    userData: updateUserData(state, action),
    commodityData: updateCommodityData(state, action),
  };
};

export default reducer;
