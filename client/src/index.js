import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import goodsService from './services/GoodsService';
import usersService from './services/UsersService';
import store from './store';
import './styles/css/bootstrap-reboot.css';
import './styles/css/bootstrap-grid.css';
import './styles/scss/main.scss';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ServicesProvider } from './components/Context';

const services = {
  goodsService,
  usersService,
};

ReactDOM.render(
  <Provider store={store}>
    <ServicesProvider value={services}>
      <Router>
        <App />
      </Router>
    </ServicesProvider>
  </Provider>,
  document.getElementById('appMountPoint')
);
