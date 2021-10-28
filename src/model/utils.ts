import { ActionFunction, Editor, History, Slide, SlideElement } from './types';
import { UUID } from './uuid';

/**
 * Returns new slide list with the element appended to the element list of the slide at the specified index
 */
export function concatWithSelectedSlideElements(
  slides: Slide[],
  selectedSlideIDs: UUID[],
  element: SlideElement
): Slide[] {
  return slides.map(slide =>
    isCurrentSlide(slide, selectedSlideIDs)
      ? {
        ...slide,
        elements: slide.elements.concat(element),
      }
      : { ...slide }
  );
}

export function isCurrentSlide(
  slide: Slide,
  selectedSlideIDs: UUID[]
): boolean {
  return slide.id === selectedSlideIDs[0];
}

export function isCurrentElement(
  element: SlideElement,
  selectedElementIDs: UUID[]
): boolean {
  return element.id === selectedElementIDs[0];
}

/**
 * Returns ID of the new current slide upon removing all selected slides
 */
export function selectNearestUnselectedSlide(
  slides: Slide[],
  selectedSlideIDs: UUID[]
): UUID[] {
  const firstSelectedSlideIndex = slides.findIndex(slide =>
    isCurrentSlide(slide, selectedSlideIDs)
  );

  if (firstSelectedSlideIndex > 0) {
    return [slides[firstSelectedSlideIndex - 1].id];
  }

  const newSlides = slides.filter(slide => !selectedSlideIDs.includes(slide.id));

  if (newSlides.length === 0) {
    return [];
  }

  return [newSlides[0].id];
}

/**
 * Returns wrapper above the action which saves presentation state after applying the action
 */
export function stateSaverWrapper(action: ActionFunction): ActionFunction {
  return (editor: Editor, ...args: never[]): Editor => {
    const newEditorState = action(editor, ...args);
    return {
      ...newEditorState,
      history: {
        ...newEditorState.history,
        undoStack: isRedoAvailable(newEditorState.history)
          ? newEditorState.history.undoStack
            .slice(newEditorState.history.currentState, -1)
            .concat(newEditorState.presentation)
          : newEditorState.history.undoStack.concat(
            newEditorState.presentation
          ),
        currentState: newEditorState.history.currentState + 1,
      },
    };
  };
}

/**
 * Returns true if current state allows redoing operations
 */
export function isRedoAvailable(history: History): boolean {
  return (
    0 <= history.currentState &&
    history.currentState < history.undoStack.length - 1
  );
}
