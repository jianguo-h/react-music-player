import React, { Component } from 'react';
import ReactHeader from './pages/header';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div>
        <ReactHeader></ReactHeader>
        { routes }
      </div>
    );
  }
}

export default App;