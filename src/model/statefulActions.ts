import { Editor, Position } from './types';
import { saveState } from './modelUtils';
import {
  addSlide as addSlideImpl,
  moveElements as moveElementsImpl,
  removeElements as removeElementsImpl,
  removeSlides as removeSlidesImpl,
  setSlideBackgroundColor as setSlideBackgroundColorImpl,
  setSlideBackgroundImage as setSlideBackgroundImageImpl,
} from './actions';

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

export function moveElements(
  editor: Editor,
  positionDiff: Position,
): Editor {
  return moveElementsImpl(saveState(editor), positionDiff);
}
