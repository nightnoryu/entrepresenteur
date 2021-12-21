import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import getEditor from './editor';

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const store = createStore(
  reducer,
  getEditor(),
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
