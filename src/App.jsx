import React, { Component } from 'react';
import ReactHeader from './pages/header';
import Player from './pages/player';
// import PlayDetail from './pages/play-detail';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div>
        <ReactHeader></ReactHeader>
        { routes }
        <Player></Player>
        {/* <PlayDetail></PlayDetail> */}
      </div>
    );
  }
}

export default App;