import React from 'react';
import '../stylesheets/css/CurrencyDisplay.css'
import {CurrencyRateHelper} from './CurrencyRateHelper'

export class CurrencyDisplay extends React.Component {
  render() {
      if(this.props.inputCurrency.length != 0 && this.props.outputCurrency.length != 0){
        return (
          <div className="CurrencyDisplay">
            <h2>{this.props.inputCurrency} to {this.props.outputCurrency}:</h2>
            <h1>{this.props.rate}</h1>
        </div>
        );
      }
      else{
        return (
          <div className="CurrencyDisplay">
            <h1>Choose some currency to exchange</h1>
          </div>
        );
      }
  }
}
