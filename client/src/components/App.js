import React, { useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import withStore from '../utils/workWithRedux';
import '../styles/scss/App.scss';
import { Route, Switch } from 'react-router-dom';
import { getDateFromLocalStorage } from '../utils/workWithBrowser';
import { chekAccess } from '../access';

const AccountPage = React.lazy(() => import('../pages/AccountPage'));
const ProductPage = React.lazy(() => import('../pages/ProductPage'));
const CommodityPage = React.lazy(() => import('../pages/CommodityPage'));
const CartPage = React.lazy(() => import('../pages/CartPage'));
const Page404 = React.lazy(() => import('../pages/404'));
const MainPage = React.lazy(() => import('../pages/MainPage'));
const CustomizingPage = React.lazy(() => import('../pages/CustomizingPage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const ResetPasswordPage = React.lazy(() => import('../pages/ResetPasswordPage'));
const HelpLoginPage = React.lazy(() => import('../pages/HelpLoginPage'));
const AdminPage = React.lazy(() => import('../pages/AdminPage'));
const CreateСommodityPage = React.lazy(() => import('../pages/CreateСommodityPage'));
const RegistrationPage = React.lazy(() => import('../pages/RegistrationPage'));
const UpdateCommodityPage = React.lazy(() => import('../pages/UpdateCommodityPage'));

const App = ({
  userData: { userName },
  menuItems: { topItems, mainItems, iconsForItems, updated },
  actions: { isLogin, updateTopHeaderMenu, loadCart, fetchGoods, fetchCommodity },
  history,
}) => {
  useEffect(() => {
    // console.log('Вызвался UseEffect из App', userName);
    chekAccess(getDateFromLocalStorage('userData'), isLogin, loadCart, fetchGoods, fetchCommodity, history);
  }, [isLogin, loadCart, fetchGoods, fetchCommodity, history]);
  useEffect(() => {
    // console.log('Вызвался UseEffect из App 2', userName);
    updateTopHeaderMenu(userName);
  }, [userName, updateTopHeaderMenu]);
  return (
    <>
      <Header
        iconsForItems={iconsForItems}
        topItems={topItems}
        mainItems={mainItems}
        updated={updated}
        userName={userName}
      />
      <div className='container content'>
        <React.Suspense fallback={<LoadingIndicator />}>
          <Switch>
            <Route path='/' component={MainPage} exact />
            <Route path='/Product/' component={ProductPage} exact />
            <Route path='/Product/search=:id' component={() => <h2>Привет мир</h2>} exact/>
            <Route path='/Product/:id' component={CommodityPage} exact/>
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
        </React.Suspense>
      </div>
      <Footer />
    </>
  );
};

export default withStore(App);
