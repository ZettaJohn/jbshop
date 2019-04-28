import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import * as serviceWorker from './serviceWorker';
import reducers from './reducers'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(
    reducers,
    applyMiddleware(thunk, promiseMiddleware())
)

ReactDOM.render(
    <Provider store={store}>
        <Router
            history={browserHistory}
            routes={routes}
        />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

