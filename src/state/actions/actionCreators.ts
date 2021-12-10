import { Dispatch } from 'react';
import Action, { ActionType } from './actions';
import { UUID } from '../../model/uuid';
import { Dimensions, Position, Presentation, PrimitiveType } from '../../model/types';

export function openPresentation(presentation: Presentation) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.OPEN_PRESENTATION,
      payload: presentation,
    });
  };
}

export function newPresentation() {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.NEW_PRESENTATION,
    });
  };
}

export function changePresentationTitle(title: string) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.CHANGE_PRESENTATION_TITLE,
      payload: title,
    });
  };
}

export function setTextValue(elementID: UUID, value: string) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.SET_TEXT_VALUE,
      payload: {
        elementID,
        value,
      },
    });
  };
}

export function selectElement(elementID: UUID) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.SELECT_ELEMENT,
      payload: elementID,
    });
  };
}

export function unselectElement(elementID: UUID) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.UNSELECT_ELEMENT,
      payload: elementID,
    });
  };
}

export function moveElements(positionDiff: Position) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.MOVE_ELEMENTS,
      payload: positionDiff,
    });
  };
}

export function resizeElement(dimensions: Dimensions) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.RESIZE_ELEMENT,
      payload: dimensions,
    });
  };
}

export function removeElements() {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.REMOVE_ELEMENTS,
    });
  };
}

export function addSlide() {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.ADD_SLIDE,
    });
  };
}

export function removeSlides() {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.REMOVE_SLIDES,
    });
  };
}

export function setSlideBackgroundImage(src: string) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.SET_SLIDE_BACKGROUND_IMAGE,
      payload: src,
    });
  };
}

export function setSlideBackgroundColor(color: string) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.SET_SLIDE_BACKGROUND_COLOR,
      payload: color,
    });
  };
}

export function setCurrentSlide(slideID: UUID) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.SET_CURRENT_SLIDE,
      payload: slideID,
    });
  };
}

export function selectSlide(slideID: UUID) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.SELECT_SLIDE,
      payload: slideID,
    });
  };
}

export function addText(position: Position, dimensions: Dimensions, value: string) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.ADD_TEXT,
      payload: {
        position,
        dimensions,
        value,
      },
    });
  };
}

export function addImage(position: Position, dimensions: Dimensions, src: string) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.ADD_IMAGE,
      payload: {
        position,
        dimensions,
        src,
      },
    });
  };
}

export function addPrimitive(position: Position, dimensions: Dimensions, primitiveType: PrimitiveType) {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.ADD_PRIMITIVE,
      payload: {
        position,
        dimensions,
        primitiveType,
      },
    });
  };
}

export function undo() {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.UNDO,
    });
  };
}

export function redo() {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: ActionType.REDO,
    });
  };
}
