import React from 'react';

export class CurrencyDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCurrency: 'USD',
      outputCurrency: 'BTN',
      currency: 0
    };
    this.setInputCurrency = this.setInputCurrency.bind(this);
    this.setOutputCurrency = this.setOutputCurrency.bind(this);
    this.setCurrency = this.setCurrency.bind(this);
  }

  setInputCurrency(val) {
    this.setState({inputCurrency: val});
  }

  setOutputCurrency(val) {
    this.setState({outputCurrency: val});
  }

  setCurrency(val) {
    this.setState({currency: val});
  }

  render() {
    return (
      <div className = "CurrencyDisplay"></div>
    );
  }
}
