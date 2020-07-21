import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';
import './styles/css/bootstrap-reboot.css';
import './styles/css/bootstrap-grid.css';
import './styles/scss/main.scss';
import './styles/scss/buttons.scss';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('appMountPoint')
);
