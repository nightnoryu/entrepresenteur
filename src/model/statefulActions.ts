import { Dimensions, Editor, Position } from './types';
import { saveState } from './modelUtils';
import {
  addImage as addImageImpl,
  addSlide as addSlideImpl,
  addText as addTextImpl,
  moveElements as moveElementsImpl,
  removeElements as removeElementsImpl,
  removeSlides as removeSlidesImpl,
  resizeElement as resizeElementImpl,
  setSlideBackgroundColor as setSlideBackgroundColorImpl,
  setSlideBackgroundImage as setSlideBackgroundImageImpl,
  setTextValue as setTextValueImpl,
} from './actions';
import { UUID } from './uuid';

export function addSlide(editor: Editor): Editor {
  return addSlideImpl(saveState(editor));
}

export function removeSlides(editor: Editor): Editor {
  return removeSlidesImpl(saveState(editor));
}

export function setSlideBackgroundColor(editor: Editor, color: string): Editor {
  return setSlideBackgroundColorImpl(saveState(editor), color);
}

export function setSlideBackgroundImage(editor: Editor, src: string): Editor {
  return setSlideBackgroundImageImpl(saveState(editor), src);
}

export function removeElements(editor: Editor): Editor {
  return removeElementsImpl(saveState(editor));
}

export function addText(editor: Editor, payload: {
  position: Position;
  dimensions: Dimensions;
  value: string;
}): Editor {
  return addTextImpl(saveState(editor), payload);
}

export function setTextValue(editor: Editor, payload: {
  elementID: UUID;
  value: string;
}): Editor {
  return setTextValueImpl(saveState(editor), payload);
}

export function addImage(editor: Editor, payload: {
  position: Position,
  dimensions: Dimensions,
  src: string,
}): Editor {
  return addImageImpl(saveState(editor), payload);
}

export function moveElements(editor: Editor, positionDiff: Position): Editor {
  return moveElementsImpl(saveState(editor), positionDiff);
}

export function resizeElement(editor: Editor, dimensions: Dimensions): Editor {
  return resizeElementImpl(saveState(editor), dimensions);
}
