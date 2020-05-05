import React, { useEffect } from 'react';
import AccountPage from '../pages/AccountPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import Page404 from '../pages/404';
import Heder from '../components/Header';
import MainPage from '../pages/MainPage';
import CustomizingPage from '../pages/CustomizingPage';
import LoginPage from '../pages/LoginPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import HelpLoginPage from '../pages/HelpLoginPage';
import Footer from '../components/Footer';
import RegistrationPage from '../pages/RegistrationPage';
import withStore from '../utils/helpFuncsForRedux';
import '../styles/scss/App.scss';
import { Route, Switch } from 'react-router-dom';
import { chekToken } from '../utils/helpFuncsForBrouser';

const App = ({ userData, menuItems: { topItems, mainItems, iconsForItems, updated }, actions: { isLogin, updateTopHeaderMenu, loadCart, fetchGoods } }) => {
  useEffect(() => {
    const localStorageUserData = JSON.parse(localStorage.getItem('userData'));
    chekToken(localStorageUserData, isLogin, loadCart, fetchGoods);
  }, [isLogin, loadCart, fetchGoods]);
  useEffect(() => {
    updateTopHeaderMenu(userData.userName);
  }, [userData.userName, updateTopHeaderMenu]);
  return (
    <>
      <Heder iconsForItems={iconsForItems} topItems={topItems} mainItems={mainItems} updated={updated} />
      <div className='container content'>
        <Switch>
          <Route path='/' component={MainPage} exact />
          <Route path='/Product/' component={ProductPage} exact />
          <Route path='/Cart/' component={CartPage} exact />
          <Route path='/Customizing/' component={CustomizingPage} exact />
          <Route path='/Login/' component={LoginPage} exact />
          <Route path='/Registration/' component={RegistrationPage} exact />
          <Route path='/MyAccount/' component={AccountPage} exact />
          <Route path='/helpLogin/' component={HelpLoginPage} exact />
          <Route path='/resetPassword/token=:id' component={ResetPasswordPage} exact />
          <Route component={Page404} exact />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default withStore(App);
