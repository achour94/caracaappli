import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'react-dice-complete/dist/react-dice-complete.css'
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk'

import caracaAuthReducer from './store/reducers/caracaAuth'
import caracaBoard from './store/reducers/caracaBoard'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    caracaAuth: caracaAuthReducer,
    caracaBoard: caracaBoard
})
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter basename="/caracaApp">
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
