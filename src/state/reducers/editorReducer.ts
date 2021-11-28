import { createEditor, createNewPresentation } from '../../model/model_utils';
import { Editor } from '../../model/types';
import Action, { ActionType } from '../actions/actions';
import {
  addSlide,
  moveElement,
  openPresentation,
  redo,
  removeElements,
  selectElement,
  setCurrentSlide,
  setPresentationTitle,
  setTextValue,
  undo,
  unselectElement,
} from '../../model/actions';

const initialState = createEditor(createNewPresentation());

function reducer(state: Editor = initialState, action: Action): Editor {
  switch (action.type) {
  case ActionType.OPEN_PRESENTATION:
    return openPresentation(state, action.payload);
  case ActionType.NEW_PRESENTATION:
    return createEditor(createNewPresentation());
  case ActionType.CHANGE_PRESENTATION_TITLE:
    return setPresentationTitle(state, action.payload);
  case ActionType.SET_TEXT_VALUE:
    return setTextValue(state, action.payload);
  case ActionType.SELECT_ELEMENT:
    return selectElement(state, action.payload);
  case ActionType.UNSELECT_ELEMENT:
    return unselectElement(state, action.payload);
  case ActionType.MOVE_ELEMENT:
    return moveElement(state, action.payload);
  case ActionType.REMOVE_ELEMENTS:
    return removeElements(state);
  case ActionType.ADD_SLIDE:
    return addSlide(state);
  case ActionType.SET_CURRENT_SLIDE:
    return setCurrentSlide(state, action.payload);
  case ActionType.UNDO:
    return undo(state);
  case ActionType.REDO:
    return redo(state);
  default:
    return state;
  }
}

export default reducer;
