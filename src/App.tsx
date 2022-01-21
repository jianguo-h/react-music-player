import React from 'react';
import { Outlet } from 'react-router-dom';
import ReactHeader from './pages/header';
import Player from './pages/player';
import SuspendLyric from './pages/suspend-lyric';
import { hot } from 'react-hot-loader/root';

const App: React.FC = () => {
  return (
    <div id='root'>
      <ReactHeader />
      <Outlet />
      <Player />
      <SuspendLyric />
    </div>
  );
};

export default hot(App);
