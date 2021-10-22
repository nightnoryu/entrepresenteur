import { History, Presentation, Slide, SlideElement } from './types';
import { UUID } from './uuid';

/**
 * Returns a copy of an array with the value inserted in positions where predicate function returns true
 */
export function insertAt<T>(
  arr: T[],
  predicate: (value: T) => boolean,
  valueToInsert: T
): T[] {
  return arr.reduce(
    (result, value) =>
      predicate(value)
        ? result.concat(valueToInsert, value)
        : result.concat(value),
    [] as T[]
  );
}

/**
 * Returns a copy of an array replacing values in positions where predicate function returns true
 */
export function replaceAt<T>(
  arr: T[],
  predicate: (value: T) => boolean,
  replacer: (value: T) => T
): T[] {
  return arr.reduce(
    (result, value) =>
      predicate(value)
        ? result.concat(replacer(value))
        : result.concat(value),
    [] as T[]
  );
}

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
 * Returns ID of the new current slide upon removing all selected slides.
 */
export function selectNearestUnselectedSlide(
  slides: Slide[],
  selectedSlideIDs: UUID[]
): UUID {
  // TODO: implement
  return '';
}

/**
 * Returns the modified history after each action, e.g. populates the undo stack and empties the redo stack
 */
export function modifyHistoryBeforeAction(
  history: History,
  presentation: Presentation
): History {
  return {
    ...history,
    undoStack: history.undoStack.concat(presentation),
    prevState: history.prevState + 1,
  };
}
