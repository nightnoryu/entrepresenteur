import editorReducer from './editorReducer';

const reducers = editorReducer;

export default reducers;
export type RootState = ReturnType<typeof reducers>;
