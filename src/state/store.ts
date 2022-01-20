import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? (window as never)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose
  : compose;

const store = createStore(
  reducer,
  undefined,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
