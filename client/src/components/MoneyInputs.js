import React from 'react';
import {CurrencySelectField} from './CurrencySelectField';
import {MoneyCountField} from './MoneyCountField';
import {CurrencyDisplay} from './CurrencyDisplay';
import {Grid, Row, Col} from 'react-bootstrap';
import {CurrencyRateHelper} from './CurrencyRateHelper';
import '../stylesheets/css/MoneyInputs.css'

const inputMoney = ['USD','BRL'];
const outputMoney = ['GBP', 'RUB'];

export class MoneyInputs extends React.Component {
  constructor(props){
    super(props);
    this.setCurrencyRate = this.setCurrencyRate.bind(this);
    CurrencyRateHelper.getRate(inputMoney[0],outputMoney[0],this.setCurrencyRate);
    this.state = {
      inputCountDisabled : false,
      outputCountDisabled : false,
      inputCountValue : '',
      outputCountValue: '',
      inputCurrency: inputMoney[0],
      outputCurrency: outputMoney[0],
      currencyRate: 'loading..'
    };
    this.onMoneyCountChanged = this.onMoneyCountChanged.bind(this);
    this.setInputCurrency = this.setInputCurrency.bind(this);
    this.setOutputCurrency = this.setOutputCurrency.bind(this);
    this.updateCurrencyRate = this.updateCurrencyRate.bind(this);
  }

  updateCurrencyRate(inputCurrency, outputCurrency){
    if(inputCurrency !== '' && outputCurrency !== ''){
        this.setCurrencyRate('loading..');
        this.setState({currencyRate : CurrencyRateHelper.getRate(inputCurrency, outputCurrency,this.setCurrencyRate)});
    }
  }

  setCurrencyRate(val){
    this.setState({currencyRate: val});
  }

  setInputCurrency(val){
    this.setState({inputCurrency: val});
    this.updateCurrencyRate(val,this.state.outputCurrency);
  }

  setOutputCurrency(val){
    this.setState({outputCurrency: val});
    this.updateCurrencyRate(this.state.inputCurrency,val);
  }

  onMoneyCountChanged(val, inputType){
    let isEmpty = val !== '';
    if(inputType === 'input'){
      this.setState({outputCountDisabled : isEmpty});
      this.setState({inputCountValue : val});
      this.setState({outputCountValue : val * this.state.currencyRate});
    }else{
      this.setState({inputCountDisabled : isEmpty});
      this.setState({outputCountValue : val});
      this.setState({inputCountValue : val / this.state.currencyRate});
    }
  }

  render() {
    return (
      <div className = 'container'>
        <form>
        <Grid>
          <Row>
            <Col md={6}>
              <CurrencySelectField labelString = 'Input money' currencyList = {inputMoney} onChange = {this.setInputCurrency}/>
              <MoneyCountField value = {this.state.inputCountValue} inputType = 'input' currencySymbol = '$' onChange = {this.onMoneyCountChanged} disabled = {this.state.inputCountDisabled}/>
            </Col>
            <Col md={6}>
              <CurrencySelectField labelString = 'Output money' currencyList = {outputMoney} onChange = {this.setOutputCurrency}/>
              <MoneyCountField value = {this.state.outputCountValue} inputType = 'output' currencySymbol = 'B' onChange = {this.onMoneyCountChanged} disabled = {this.state.outputCountDisabled}/>
            </Col>
          </Row>
          <CurrencyDisplay inputCurrency = {this.state.inputCurrency} outputCurrency = {this.state.outputCurrency} rate = {this.state.currencyRate}/>
        </Grid>
        </form>
      </div>
    );
  }
}
