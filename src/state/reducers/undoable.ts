import editorReducer from './editorReducer';
import { Editor } from '../../model/types';
import Action, { ActionType, STATEFUL_ACTIONS } from '../actions/actions';
import { saveState } from '../../model/modelUtils';
import { redo, undo } from '../../model/actions';
import getInitialState from '../initialState';

function undoable(reducer: typeof editorReducer): typeof editorReducer {
  return function (state = getInitialState(), action: Action): Editor {
    switch (action.type) {
    case ActionType.UNDO:
      return undo(state);
    case ActionType.REDO:
      return redo(state);
    default: {
      const newEditor = reducer(state, action);
      if (STATEFUL_ACTIONS.includes(action.type)) {
        return saveState(state, newEditor);
      }
      return newEditor;
    }
    }
  };
}

export default undoable;
