import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers'
import {BrowserRouter} from "react-router-dom"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
const reduxStore=createStore(reducers,applyMiddleware(thunk))



root.render(
    <Provider store={reduxStore}>
        <BrowserRouter>

    <App />

        </BrowserRouter>
    </Provider>
);
