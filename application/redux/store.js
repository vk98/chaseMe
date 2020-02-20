import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ReactActionSocketMiddleware } from 'react-redux-socket/client'
import Constants from "expo-constants";

const initialState = {};

const middleware = [thunk, ReactActionSocketMiddleware(`http://${Constants.manifest.debuggerHost.split(':').shift()}:4000`).log(console.warn)];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
  // applyMiddleware(...middleware)
);
 
export default store;
