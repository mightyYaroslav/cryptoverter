import React from 'react';
import {
  FormControl,ControlLabel
} from 'react-bootstrap';

/*
  props:
    currencyList - array with currencies.
    labelString - label text.
*/

export class CurrencySelectField extends React.Component{
  render(){
    return (
      <div>
        <ControlLabel>{this.props.labelString}</ControlLabel>
        <FormControl componentClass="select" placeholder="select">
          {this.props.currencyList.map((money) => {
            return (
              <option value='other'>{money}</option>
            );
          })}
        </FormControl>
      </div>
    );
  }
}
