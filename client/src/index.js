import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './utils/registerServiceWorker';
import './semantic/dist/semantic.min.css';
import { Provider } from 'react-redux';
import { createStore} from 'redux'
import reducers from './reducers'

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store = {store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
