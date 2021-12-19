export enum ActionType {
  OPEN_PRESENTATION,
  NEW_PRESENTATION,
  CHANGE_PRESENTATION_TITLE,
  SET_TEXT_VALUE,
  SET_TEXT_FONT,
  SET_TEXT_SIZE,
  SET_TEXT_COLOR,
  SET_PRIMITIVE_FILL_COLOR,
  SET_PRIMITIVE_STROKE_COLOR,
  SELECT_ELEMENT,
  UNSELECT_ELEMENT,
  MOVE_ELEMENTS,
  RESIZE_ELEMENT,
  REMOVE_ELEMENTS,
  ADD_SLIDE,
  REMOVE_SLIDES,
  NEXT_SLIDE,
  PREVIOUS_SLIDE,
  SET_SLIDE_BACKGROUND_IMAGE,
  SET_SLIDE_BACKGROUND_COLOR,
  SET_CURRENT_SLIDE,
  SELECT_SLIDE,
  ADD_TEXT,
  ADD_IMAGE,
  ADD_PRIMITIVE,
  UNDO,
  REDO,
}

type Action = {
  type: ActionType;
  payload?: any;
}

export default Action;
