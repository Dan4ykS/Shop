import React, { useEffect } from 'react';
import AccountPage from '../pages/AccountPage';
import ProductPage from '../pages/ProductPage';
import CommodityPage from '../pages/CommodityPage';
import CartPage from '../pages/CartPage';
import Page404 from '../pages/404';
import Header from '../components/Header';
import MainPage from '../pages/MainPage';
import CustomizingPage from '../pages/CustomizingPage';
import LoginPage from '../pages/LoginPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import HelpLoginPage from '../pages/HelpLoginPage';
import AdminPage from '../pages/AdminPage';
import CreateСommodityPage from '../pages/CreateСommodityPage';
import Footer from '../components/Footer';
import RegistrationPage from '../pages/RegistrationPage';
import UpdateCommodityPage from '../pages/UpdateCommodityPage';
import withStore from '../utils/workWithRedux';
import '../styles/scss/App.scss';
import { Route, Switch } from 'react-router-dom';
import { getDateFromLocalStorage } from '../utils/workWithBrowser';
import { chekAccess } from '../access';

const App = ({ userData: { userName }, menuItems: { topItems, mainItems, iconsForItems, updated }, actions: { isLogin, updateTopHeaderMenu, loadCart, fetchGoods, invalidRoute }, history }) => {
  useEffect(() => {
    // console.log('Вызвался UseEffect из App', userName);
    chekAccess(getDateFromLocalStorage('userData'), isLogin, loadCart, fetchGoods, history);
  }, [isLogin, loadCart, fetchGoods, history]);
  useEffect(() => {
    // console.log('Вызвался UseEffect из App 2', userName);
    updateTopHeaderMenu(userName);
  }, [userName, updateTopHeaderMenu]);
  return (
    <>
      <Header iconsForItems={iconsForItems} topItems={topItems} mainItems={mainItems} updated={updated} userName={userName} />
      <div className='container content'>
        <Switch>
          <Route path='/' component={MainPage} exact />
          <Route path='/Product/' component={ProductPage} exact />
          <Route path='/Product/:id' component={CommodityPage} exact />
          <Route path='/Cart/' component={CartPage} exact />
          <Route path='/Customizing/' component={CustomizingPage} exact />
          <Route path='/Login/' component={LoginPage} exact />
          <Route path='/Registration/' component={RegistrationPage} exact />
          <Route path='/MyAccount/' component={AccountPage} />
          <Route path='/helpLogin/' component={HelpLoginPage} exact />
          <Route path='/resetPassword/token=:id' component={ResetPasswordPage} exact />
          <Route path='/admin' component={AdminPage} exact />
          <Route path='/admin/createCommodity/' component={CreateСommodityPage} />
          <Route path='/admin/updateCommodity/:id' component={UpdateCommodityPage} />
          <Route component={Page404} exact />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default withStore(App);
