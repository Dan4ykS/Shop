import React, { useEffect } from 'react';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import Header from '../Header';
import Footer from '../Footer';
import { connectToStore } from '../../utils/workWithRedux';
import { Route, Switch } from 'react-router-dom';
import { getDateFromLocalStorage } from '../../utils/workWithBrowser';
import { chekAccess } from '../../access';
import { isLogin } from '../../actions/userData';
import { loadCart } from '../../actions/shopingCart';
import { fetchGoods } from '../../actions/goodsList';
import { fetchCommodity } from '../../actions/commodityData';
import { createLazyPage } from '../../utils/workWithReactElements';

const MainPage = createLazyPage('Main'),
  GoodsPage = createLazyPage('Goods'),
  CommodityPage = createLazyPage('Commodity'),
  LoginPage = createLazyPage('Login'),
  RegistrationPage = createLazyPage('Registration'),
  AccountPage = createLazyPage('Account'),
  AdminPage = createLazyPage('Admin'),
  CreateСommodityPage = createLazyPage('CreateСommodity'),
  UpdateCommodityPage = createLazyPage('UpdateCommodity'),
  CartPage = createLazyPage('Cart'),
  HelpLoginPage = createLazyPage('HelpLogin'),
  ResetPasswordPage = createLazyPage('ResetPassword'),
  NotFoundPage = createLazyPage('NotFound');

const App = ({ actions: { isLogin, loadCart, fetchGoods, fetchCommodity }, history }) => {
  useEffect(() => {
    // console.log('Вызвался UseEffect из App', userName);
    chekAccess(getDateFromLocalStorage('userData'), isLogin, loadCart, fetchGoods, fetchCommodity, history);
  }, [isLogin, loadCart, fetchGoods, fetchCommodity, history]);
  
  return (
    <>
      <Header />
      <div className='container content'>
        <React.Suspense fallback={<LoadingIndicator />}>
          <Switch>
            <Route path='/' component={MainPage} exact />
            <Route path='/Product/' component={GoodsPage} exact />
            <Route path='/Product/:id' component={CommodityPage} exact />
            <Route path='/Cart/' component={CartPage} exact />
            <Route path='/Login/' component={LoginPage} exact />
            <Route path='/Registration/' component={RegistrationPage} exact />
            <Route path='/MyAccount/' component={AccountPage} />
            <Route path='/helpLogin/' component={HelpLoginPage} exact />
            <Route path='/resetPassword/token=:id' component={ResetPasswordPage} exact />
            <Route path='/admin' component={AdminPage} exact />
            <Route path='/admin/createCommodity/' component={CreateСommodityPage} />
            <Route path='/admin/updateCommodity/:id' component={UpdateCommodityPage} />
            <Route component={NotFoundPage} exact />
          </Switch>
        </React.Suspense>
      </div>
      <Footer />
    </>
  );
};

export default connectToStore(null, [isLogin, loadCart, fetchGoods, fetchCommodity])(App, true);
