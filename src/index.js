import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer,
    compose(   
        applyMiddleware(thunk)
    )
);

ReactDOM.render(<BrowserRouter><Provider store={store}><App/></Provider></BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
