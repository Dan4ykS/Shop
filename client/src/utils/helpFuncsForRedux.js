import withServices from '../hoc/withServices';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchGoods } from '../actions/goodsList';
import { onAddedToCart, onDeletedFromCart, loadCart } from '../actions/shopingCart';
import { authorization, registration, isLogin, isLogout } from '../actions/userData';
import { updateTopHeaderMenu } from '../actions/menuItems';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ goodsList, shopingCart, userData, menuItems }) => {
  return { goodsList, shopingCart, userData, menuItems };
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
  };
  return { actions };
};

const withStore = (Component) => compose(withServices(), connect(mapStateToProps, mapDispatchToProps))(withRouter(Component));

export default withStore;
