import { Editor, Position } from './types';
import { saveState } from './modelUtils';
import { moveElements as moveElementsImpl } from './actions';

export function moveElements(
  editor: Editor,
  positionDiff: Position,
): Editor {
  return moveElementsImpl(saveState(editor), positionDiff);
}
