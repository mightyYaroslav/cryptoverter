import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';

const testOptions = [{key: 'c1', value: 'c1', text: 'currency1'}, {
    key: 'c2',
    value: 'c2',
    text: 'currency2'
}, {key: 'c3', value: 'c3', text: 'currency3'}];

class CurrencySelect extends Component {
    render() {
        return (
            <Dropdown placeholder={this.props.placeholder} search selection fluid size="huge" type="number"
                      options={testOptions}/>
        );
    }
}

export default CurrencySelect;