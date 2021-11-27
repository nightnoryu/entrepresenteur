import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import getEditor from './editor';

const store = createStore(
  reducers,
  { editor: getEditor() },
  applyMiddleware(thunk),
);

export default store;
