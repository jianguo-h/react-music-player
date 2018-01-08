import React from 'react';
import { render } from 'react-dom';
import App from './App';
import adapt from './js/adapt';
import './less/app.less';

// hot module
if(module.hot) {
  module.hot.accept();
}

// some config
adapt();

render(
  <App />,
  document.getElementById('app')
);