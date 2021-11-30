import editorReducer from './editorReducer';

const reducers = editorReducer; // TODO: replace with combineReducers

export default reducers;
export type RootState = ReturnType<typeof reducers>;
