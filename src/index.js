import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

const store = createStore(reducer,
    composeEnhancers(   
        applyMiddleware(thunk)
    )
);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

registerServiceWorker();
