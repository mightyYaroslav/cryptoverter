import {MoneyInputs} from './components/MoneyInputs'
import {Header} from './components/Header'

import React, {
  Component
} from 'react';

export class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <MoneyInputs/>
      </div>
  );
  }
}
