import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import getEditor from './editor';
import listener from './history/listener';

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const store = createStore(
  reducers,
  getEditor(),
  composeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(listener(store));

export default store;
