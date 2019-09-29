import React from 'react';
import ReactHeader from './pages/header';
import Player from './pages/player';
import SuspendLyric from './pages/suspend-lyric';
import routes from './routes';
import { hot } from 'react-hot-loader/root';

function App() {
  return (
    <div id="root">
      <ReactHeader />
      {routes}
      <Player />
      <SuspendLyric />
    </div>
  );
}

export default hot(App);
