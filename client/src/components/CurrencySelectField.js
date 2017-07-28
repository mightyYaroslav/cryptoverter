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
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e){
    this.props.onChange(e.target.value);
  }
  render(){
    return (
      <div>
        <ControlLabel>{this.props.labelString}</ControlLabel>
        <FormControl componentClass="select" onChange = {this.onChange}>
          {this.props.currencyList.map((money) => {
            return (
              <option value={money}>{money}</option>
            );
          })}
        </FormControl>
      </div>
    );
  }
}
