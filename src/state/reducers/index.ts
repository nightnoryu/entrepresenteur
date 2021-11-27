import editorReducer from './editorReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  editor: editorReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
