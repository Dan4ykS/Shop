import withServices from '../hoc/withServices';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchGoods } from '../actions/goodsList';
import { onAddedToCart, onDeletedFromCart, loadCart } from '../actions/shopingCart';
import { authorization, registration, isLogin, isLogout, invalidRoute, userLogin } from '../actions/userData';
import { updateTopHeaderMenu } from '../actions/menuItems';
import { withRouter } from 'react-router-dom';
import {
  updateImg,
  updatePreviewImg,
  fetchCommodity,
  updateTitle,
  updateDescr,
  updateShortDescr,
  updatePrice,
  reloadCommodityData,
} from '../actions/commodityData';

const mapStateToProps = ({ goodsList, shopingCart, userData, menuItems, calendarData, commodityData }) => {
  return { goodsList, shopingCart, userData, menuItems, calendarData, commodityData };
};

const mapDispatchToProps = (dispatch, { services }) => {
  const actions = {
    fetchGoods: fetchGoods(dispatch, services),
    onAddedToCart: onAddedToCart(dispatch, services),
    onDeletedFromCart: onDeletedFromCart(dispatch, services),
    authorization: authorization(dispatch, services),
    registration: registration(dispatch, services),
    isLogin: isLogin(dispatch, services),
    isLogout: isLogout(dispatch),
    updateTopHeaderMenu: updateTopHeaderMenu(dispatch),
    loadCart: loadCart(dispatch, services),
    invalidRoute: () => dispatch(invalidRoute()),
    userLogin: (userName, token) => dispatch(userLogin(userName, token)),
    fetchCommodity: fetchCommodity(dispatch, services),
    updateCommodityPreviewImg: (previewImgFile, previewImgSrc, previewImgAlt) =>
      dispatch(updatePreviewImg(previewImgFile, previewImgSrc, previewImgAlt)),
    updateCommodityImg: (imgFile, imgSrc, imgAlt) => dispatch(updateImg(imgFile, imgSrc, imgAlt)),
    updateCommodityTitle: (title) => dispatch(updateTitle(title)),
    updateCommodityDescr: (descr) => dispatch(updateDescr(descr)),
    updateCommodityShortDescr: (shortDescr) => dispatch(updateShortDescr(shortDescr)),
    updateCommodityPrice: (price) => dispatch(updatePrice(price)),
    reloadCommodityData: () => dispatch(reloadCommodityData()),
  };
  return { actions };
};
export const changeArrayElement = (array, indexElForChange, newElement) => {
  return [...array.slice(0, indexElForChange), newElement, ...array.slice(indexElForChange + 1)];
};

export const removeArrayElement = (array, indexElForRemove) => {
  return [...array.slice(0, indexElForRemove), ...array.slice(indexElForRemove + 1)];
};

export const addArrayElement = (array, newElement) => {
  return [...array, newElement];
};

export const createAction = (action, payload = null) => {
  return {
    type: action,
    payload,
  };
};

const withStore = (Component) =>
  compose(withServices(), connect(mapStateToProps, mapDispatchToProps))(withRouter(Component));

export default withStore;
