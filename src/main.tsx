import React from 'react';
import store from './store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import adapt from './ts/adapt';
import './less/app.less';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './pages/list';

// some config
adapt();

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<List />} />
          <Route path=':type' element={<List />} />
          <Route path='search/:keyword' element={<List />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
