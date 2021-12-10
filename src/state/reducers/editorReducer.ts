import { createEditor, createNewPresentation } from '../../model/modelUtils';
import { Editor } from '../../model/types';
import Action, { ActionType } from '../actions/actions';
import {
  openPresentation,
  redo,
  selectElement,
  selectSlide,
  setCurrentSlide,
  setPresentationTitle,
  undo,
  unselectElement,
} from '../../model/actions';
import {
  addImage,
  addPrimitive,
  addSlide,
  addText,
  moveElements,
  removeElements,
  removeSlides,
  resizeElement,
  setSlideBackgroundColor,
  setSlideBackgroundImage,
  setTextValue,
} from '../../model/statefulActions';

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
  case ActionType.MOVE_ELEMENTS:
    return moveElements(state, action.payload);
  case ActionType.RESIZE_ELEMENT:
    return resizeElement(state, action.payload);
  case ActionType.REMOVE_ELEMENTS:
    return removeElements(state);
  case ActionType.ADD_SLIDE:
    return addSlide(state);
  case ActionType.REMOVE_SLIDES:
    return removeSlides(state);
  case ActionType.SET_SLIDE_BACKGROUND_IMAGE:
    return setSlideBackgroundImage(state, action.payload);
  case ActionType.SET_SLIDE_BACKGROUND_COLOR:
    return setSlideBackgroundColor(state, action.payload);
  case ActionType.SET_CURRENT_SLIDE:
    return setCurrentSlide(state, action.payload);
  case ActionType.SELECT_SLIDE:
    return selectSlide(state, action.payload);
  case ActionType.ADD_TEXT:
    return addText(state, action.payload);
  case ActionType.ADD_IMAGE:
    return addImage(state, action.payload);
  case ActionType.ADD_PRIMITIVE:
    return addPrimitive(state, action.payload);
  case ActionType.UNDO:
    return undo(state);
  case ActionType.REDO:
    return redo(state);
  default:
    return state;
  }
}

export default reducer;
