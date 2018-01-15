import * as reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';

const reducer = combineReducers(reducers);
const middlewares = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middlewares);

export default store;