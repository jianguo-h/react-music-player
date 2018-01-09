import React, { Component } from 'react';
import ReactHeader from './pages/header';
import List from './pages/list';

class App extends Component {
  render() {
    return (
      <div>
        <ReactHeader></ReactHeader>
        <List></List>
        hello react!!!!
      </div>
    );
  }
}

export default App;