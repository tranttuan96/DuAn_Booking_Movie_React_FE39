import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import antd css
import 'antd/dist/antd.css';

import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
