import { Dimensions, Editor, Position, PrimitiveType } from './types';
import { saveState } from './modelUtils';
import {
  addImage as addImageImpl,
  addPrimitive as addPrimitiveImpl,
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
  return saveState(editor, addSlideImpl(editor));
}

export function removeSlides(editor: Editor): Editor {
  return saveState(editor, removeSlidesImpl(editor));
}

export function setSlideBackgroundColor(editor: Editor, color: string): Editor {
  return saveState(editor, setSlideBackgroundColorImpl(editor, color));
}

export function setSlideBackgroundImage(editor: Editor, src: string): Editor {
  return saveState(editor, setSlideBackgroundImageImpl(editor, src));
}

export function removeElements(editor: Editor): Editor {
  return saveState(editor, removeElementsImpl(editor));
}

export function addText(editor: Editor, payload: {
  position: Position;
  dimensions: Dimensions;
  value: string;
}): Editor {
  return saveState(editor, addTextImpl(editor, payload));
}

export function setTextValue(editor: Editor, payload: {
  elementID: UUID;
  value: string;
}): Editor {
  return saveState(editor, setTextValueImpl(editor, payload));
}

export function addImage(editor: Editor, payload: {
  position: Position,
  dimensions: Dimensions,
  src: string,
}): Editor {
  return saveState(editor, addImageImpl(editor, payload));
}

export function addPrimitive(editor: Editor, payload: {
  position: Position,
  dimensions: Dimensions,
  primitiveType: PrimitiveType,
}): Editor {
  return saveState(editor, addPrimitiveImpl(editor, payload));
}

export function moveElements(editor: Editor, positionDiff: Position): Editor {
  return saveState(editor, moveElementsImpl(editor, positionDiff));
}

export function resizeElement(editor: Editor, dimensions: Dimensions): Editor {
  return saveState(editor, resizeElementImpl(editor, dimensions));
}
