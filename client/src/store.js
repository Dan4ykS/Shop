import reducer from './reducers/reducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
