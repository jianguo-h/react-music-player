import api from './api';
import React from 'react';
import store from './store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import adapt from './js/adapt';
import { Toast } from 'antd-mobile';
import { HashRouter as Router } from 'react-router-dom';
import './less/app.less';

// hot module
if(module.hot) {
  module.hot.accept();
}

// some config
adapt();
window.api = api;
window.Toast = Toast;

render(
  <Provider store = { store }>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);