import reducer from './reducers/reducer';
import { createStore } from 'redux';

const store = createStore(reducer);

export default store;
