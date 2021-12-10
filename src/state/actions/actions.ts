export enum ActionType {
  OPEN_PRESENTATION,
  NEW_PRESENTATION,
  CHANGE_PRESENTATION_TITLE,
  SET_TEXT_VALUE,
  SELECT_ELEMENT,
  UNSELECT_ELEMENT,
  MOVE_ELEMENT,
  REMOVE_ELEMENTS,
  ADD_SLIDE,
  REMOVE_SLIDES,
  SET_SLIDE_BACKGROUND_IMAGE,
  SET_CURRENT_SLIDE,
  SELECT_SLIDE,
  ADD_TEXT,
  ADD_IMAGE,
  UNDO,
  REDO,
}

type Action = {
  type: ActionType;
  payload?: any;
}

export default Action;
