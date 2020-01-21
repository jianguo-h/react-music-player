import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReactHeader from './pages/header';
import Player from './pages/player';
import List from './pages/list';
import SuspendLyric from './pages/suspend-lyric';
import { hot } from 'react-hot-loader/root';

function App() {
  return (
    <div id="root">
      <ReactHeader />
      <>
        <Route path='/new' component={List} />
        <Route path='/recommend' component={List} />
        <Route path='/local' component={List} />
        <Route path='/search/:keyword' component={List} />
        <Redirect to='/new' />
      </>
      <Player />
      <SuspendLyric />
    </div>
  );
}

export default hot(App);
