import { Editor, History, Slide, SlideElement } from './types';
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

  const newSlides = slides.filter(
    slide => !selectedSlideIDs.includes(slide.id)
  );

  if (newSlides.length === 0) {
    return [];
  }

  return [newSlides[0].id];
}

export function saveState(editor: Editor): Editor {
  return {
    ...editor,
    history: {
      ...editor.history,
      undoStack: isRedoAvailable(editor.history)
        ? editor.history.undoStack
          .slice(editor.history.currentState, -1)
          .concat(editor.presentation)
        : editor.history.undoStack.concat({ ...editor.presentation }),
      currentState: editor.history.currentState + 1,
    },
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
