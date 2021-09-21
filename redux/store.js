import { createStore } from 'redux';
import StateReducer from './StateReducer';

const store = createStore(StateReducer);

export default store;