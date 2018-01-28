import React, { Component } from 'react';
import ReactHeader from './pages/header';
import Player from './pages/player';
import SuspendLyric from './pages/suspend-lyric';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div id = 'root'>
        <ReactHeader></ReactHeader>
        { routes }
        <Player></Player>
        <SuspendLyric></SuspendLyric>
      </div>
    );
  }
}

export default App;