import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ReactHeader from './pages/header';
import Player from './pages/player';
import List from './pages/list';
import SuspendLyric from './pages/suspend-lyric';

const App: React.FC = () => {
  return (
    <div id='root'>
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
};

export default App;
