import withServices from '../hoc/withServices';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchGoods } from '../actions/goodsList';
import { onAddedToCart, onDeletedFromCart, loadCart } from '../actions/shopingCart';
import { authorization, registration, isLogin, isLogout, invalidRoute, userLogin } from '../actions/userData';
import { updateTopHeaderMenu } from '../actions/menuItems';
import { withRouter } from 'react-router-dom';
import { updateImg, updatePreviewImg, fetchCommodity } from '../actions/commodityData';

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
    updateImg: (img, imgSrc) => dispatch(updateImg(img, imgSrc)),
    invalidRoute: () => dispatch(invalidRoute()),
    userLogin: (userName, token) => dispatch(userLogin(userName, token)),
    updatePreviewImg: (previewImg, previewImgSrc) => dispatch(updatePreviewImg(previewImg, previewImgSrc)),
    fetchCommodity: fetchCommodity(dispatch, services),
  };
  return { actions };
};
export const changeArrayElement = (array, indexElForChange, newElement) => {
  return [...array.slice(0, indexElForChange), newElement, ...array.slice(indexElForChange + 1)];
};

export const removeArrayElement = (array, indexElForRemove) => {
  return [...array.slice(0, indexElForRemove), ...array.slice(indexElForRemove + 1)];
};

// export const transformDataFromServer = (data, extraConditionals) => {
//   const extraDataToConvert = extraConditionals.map((obj) => { 
//     for (const key in obj) {
//       return {key: obj[key]}
//     }
//   })
//   return data.map((el) => ({
//     ...el,
//     id: el._id,
//     ...extraConditionals[0]: ...extraConditionals[1]
//   }));
// };

const withStore = (Component) => compose(withServices(), connect(mapStateToProps, mapDispatchToProps))(withRouter(Component));

export default withStore;
