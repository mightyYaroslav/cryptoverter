import React from 'react';
import {FormControl, InputGroup} from 'react-bootstrap';

/*
  props:
    currencySymbol - addon symbol for currency.
*/

export class MoneyCountField extends React.Component {
  render() {
    return (
      <div>
        <InputGroup>
          <FormControl type="number" placeholder="count"/>
          <InputGroup.Addon>{this.props.currencySymbol}</InputGroup.Addon>
        </InputGroup>
      </div>
    );
  }
}
