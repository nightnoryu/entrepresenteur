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
  SET_FIRST_CURRENT_SLIDE,
  MOVE_SLIDES_UP,
  MOVE_SLIDES_DOWN,
  MOVE_SLIDES_TO_BEGINNING,
  MOVE_SLIDES_TO_END,
  ADD_TEXT,
  ADD_IMAGE,
  ADD_PRIMITIVE,
  UNDO,
  REDO,
  START_DEMONSTRATION,
  STOP_DEMONSTRATION,
}

export const STATEFUL_ACTIONS = [
  ActionType.SET_TEXT_VALUE,
  ActionType.SET_TEXT_FONT,
  ActionType.SET_TEXT_SIZE,
  ActionType.SET_TEXT_COLOR,
  // ActionType.SET_PRIMITIVE_FILL_COLOR,
  // ActionType.SET_PRIMITIVE_STROKE_COLOR,
  ActionType.MOVE_ELEMENTS,
  ActionType.RESIZE_ELEMENT,
  ActionType.REMOVE_ELEMENTS,
  ActionType.ADD_SLIDE,
  ActionType.REMOVE_SLIDES,
  ActionType.MOVE_SLIDES_UP,
  ActionType.MOVE_SLIDES_DOWN,
  ActionType.MOVE_SLIDES_TO_BEGINNING,
  ActionType.MOVE_SLIDES_TO_END,
  ActionType.SET_SLIDE_BACKGROUND_IMAGE,
  ActionType.SET_SLIDE_BACKGROUND_COLOR,
  ActionType.ADD_TEXT,
  ActionType.ADD_IMAGE,
  ActionType.ADD_PRIMITIVE,
];

type Action = {
  type: ActionType;
  // eslint-disable-next-line
  payload?: any;
}

export default Action;
