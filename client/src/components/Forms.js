import React, {Component} from 'react';
import Grid from "semantic-ui-react/dist/es/collections/Grid/Grid";
import '../stylesheets/Forms.css'
import Header from "semantic-ui-react/dist/es/elements/Header/Header";
import Icon from "semantic-ui-react/dist/es/elements/Icon/Icon";
import CurrencySelect from './CurrencySelect';
import CountInput from "./CountInput";
import {Button} from 'semantic-ui-react';
import {connect} from "react-redux";
import {inputCountChanged, outputCountChanged} from "../actions";

class Forms extends Component {
    onInputChanged(e){
        this.props.onInputChanged(e.target.value);
    }

    onOutputChanged(e){
        this.props.onOutputChanged(e.target.value);
    }

    render() {
        return (
            <div>
                <Grid textAlign="center" columns={2} celled>
                    <Grid.Row>
                        <Grid.Column>
                                <Header as="h2">
                                    <Icon name="hand paper"/>
                                    Selling
                                </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h2">
                                <Icon name="hand rock"/>
                                Buying
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <CurrencySelect placeholder="Sell currency"/>
                            <CountInput onChange = {this.onInputChanged.bind(this)}/>
                        </Grid.Column>
                        <Grid.Column>
                            <CurrencySelect placeholder="Buy currency"/>
                            <CountInput onChange = {this.onOutputChanged.bind(this)}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Button size="massive" color="olive" icon="exchange" fluid content="Exchange"/>
                        {/*TEST*/}
                        {this.props.inputCount} + {this.props.outputCount}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default connect(
    state => ({
        inputCount: state.countInputsReducer.inputCount,
        outputCount: state.countInputsReducer.outputCount
    }),
    dispatch => ({
        onInputChanged: (newValue) =>{
            dispatch(inputCountChanged(newValue));
        },
        onOutputChanged: (newValue) =>{
            dispatch(outputCountChanged(newValue));
        }
    })
)(Forms);