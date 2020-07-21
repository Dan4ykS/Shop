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

const App = ({ actions, history }) => {
  useEffect(() => {
    // console.log('Вызвался UseEffect из App', userName);
    chekAccess(getDateFromLocalStorage('userData'), actions, history);
  }, [actions, history]);

  return (
    <>
      <Header />
      <div className='content'>
        <div className='container'>
          <React.Suspense fallback={<LoadingIndicator />}>
            <Switch>
              <Route path='/' component={MainPage} exact />
              <Route path='/Goods/:params?' component={GoodsPage} exact />
              <Route path='/Goods/commodity-:id' component={CommodityPage} exact />
              <Route path='/Cart' component={CartPage} exact />
              <Route path='/Login' component={LoginPage} exact />
              <Route path='/Registration' component={RegistrationPage} exact />
              <Route path='/MyAccount' component={AccountPage} exact />
              <Route path='/helpLogin/' component={HelpLoginPage} />
              <Route path='/resetPassword/token=:id' component={ResetPasswordPage} exact />
              <Route path='/admin' component={AdminPage} exact />
              <Route path='/admin/createCommodity' component={CreateСommodityPage} exact />
              <Route path='/admin/updateCommodity/:id' component={UpdateCommodityPage} />
              <Route component={NotFoundPage} exact />
            </Switch>
          </React.Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default connectToStore(null, [isLogin, loadCart, fetchGoods, fetchCommodity])(App, true);
