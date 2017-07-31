import React, { Component } from 'react';
import PageHeader from './PageHeader';
import Forms from "./Forms";

class App extends Component {
  render() {
    return (
        <div>
          <PageHeader/>
          <Forms/>
        </div>
    );
  }
}

export default App;
