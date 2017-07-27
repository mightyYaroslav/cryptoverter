import React, {
  Component
} from 'react';
import './App.css';
import { Button, FormControl, Grid, Row, Col } from 'react-bootstrap';

const inputMoney = ['USD'];
const outputMoney = ['BITCOIN'];

const formInstance = (
    <div className = "container">
      <form>
        <Grid>
          <Row>
            <Col md = {6}>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">Input money</option>
              {inputMoney.map((money) => {
                return (<option value = 'other'>{money}</option>);
              })}
            </FormControl>
            </Col>
            <Col md = {6}>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">Output money</option>
              {outputMoney.map((money) => {
                return (<option value = 'other'>{money}</option>);
              })}
            </FormControl>
            </Col>
            </Row>
        </Grid>
        <Button type = "submit"> Submit </Button>
      </form>
    </div>
);

export class App extends Component {
  render() {
    return formInstance;
  }
}
