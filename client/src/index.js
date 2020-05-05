import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import GoodsService from './services/GoodsService';
import UsersService from './services/UsersService';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ServicesProvider } from './components/Context';

const services = {
  goodsService: new GoodsService(),
  usersService: new UsersService(),
};

ReactDOM.render(
  <Provider store={store}>
    <ServicesProvider value={services}>
      <Router>
        <App />
      </Router>
    </ServicesProvider>
  </Provider>,
  document.getElementById('reduxApp')
);
