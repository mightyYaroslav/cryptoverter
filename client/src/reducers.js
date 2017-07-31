import { combineReducers } from 'redux';

import {INPUT_COUNT_CHANGED,OUTPUT_COUNT_CHANGED} from './actions';

function countInputsReducer(state = {inputCount: '', outputCount: ''}, action) {
    switch (action.type){
        case INPUT_COUNT_CHANGED:
            return Object.assign({},state, {inputCount: action.newValue});
        case OUTPUT_COUNT_CHANGED:
            return Object.assign({},state, {outputCount: action.newValue});
        default:
            return state;
    }
}

const reducers = combineReducers({countInputsReducer});

export default reducers;
