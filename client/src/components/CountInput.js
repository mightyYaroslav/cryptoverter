import React, {Component} from 'react';
import {Input} from 'semantic-ui-react';

class CountInput extends Component {
    render() {
        return (
            <Input icon='currency' onChange = {this.props.onChange} placeholder='Count' size = "huge" fluid />
        );
    }
}

export default CountInput;