import React from 'react';
import {FormControl, InputGroup} from 'react-bootstrap';

/*
  props:
    currencySymbol - addon symbol for currency.
    onChange - onChange event callback
    disabled - disabled value
    inputType - input or output
*/

export class MoneyCountField extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.props.onChange(e.target.value,this.props.inputType);
  }

  render() {
    return (
      <div>
        <InputGroup>
          <FormControl type="number" value = {this.props.value} onChange = {this.onChange} placeholder="count" disabled={this.props.disabled}/>
          <InputGroup.Addon>{this.props.currencySymbol}</InputGroup.Addon>
        </InputGroup>
      </div>
    );
  }
}
