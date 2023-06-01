import { createStore } from 'redux';
import playerReducer from '../reducer/PlayerReducer.js';

const store = createStore(playerReducer);


export default store;
