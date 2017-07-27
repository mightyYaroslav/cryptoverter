import React from 'react';

import {CurrencySelectField} from './CurrencySelectField'
import {MoneyCountField} from './MoneyCountField'

import {
  Button,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

const inputMoney = ['USD'];
const outputMoney = ['BITCOIN'];

export class MoneyInputs extends React.Component {
  render() {
    return (
      <form>
        <Grid>
          <Row>
            <Col md={6}>
              <CurrencySelectField labelString = 'Input money' currencyList = {inputMoney}/>
              <MoneyCountField currencySymbol = '$'/>
            </Col>
            <Col md={6}>
              <CurrencySelectField labelString = 'Output money' currencyList = {outputMoney}/>
              <MoneyCountField currencySymbol = 'B'/>
            </Col>
          </Row>
      </Grid>
      < Button type = "submit" > Submit < /Button>
    </form >
    );
  }
}
