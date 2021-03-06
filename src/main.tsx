import React from 'react';
import store from './store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import adapt from './ts/adapt';
import { HashRouter as Router } from 'react-router-dom';
import './less/app.less';

// some config
adapt();

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
