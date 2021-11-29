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
  SET_CURRENT_SLIDE,
  SAVE_STATE,
  UNDO,
  REDO,
}

type Action = {
  type: ActionType;
  payload?: any;
}

export default Action;
