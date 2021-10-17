import { Slide, SlideElement } from './types';
import { UUID } from './uuid';

/**
 * Returns a copy of an array with the value inserted in positions where finder 
 * function returns true
 */
export function insertAt<T>(
  arr: T[],
  finder: (value: T) => boolean,
  valueToInsert: T
): T[] {
  return arr.reduce(
    (result, value) =>
      finder(value)
        ? result.concat(valueToInsert, value)
        : result.concat(value),
    [] as T[]
  );
}

/**
 * Returns a copy of an array replacing values in positions where finder 
 * function returns true
 */
export function replaceAt<T>(
  arr: T[],
  finder: (value: T) => boolean,
  replacer: (value: T) => T
): T[] {
  return arr.reduce(
    (result, value) =>
      finder(value)
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
    slide.id === selectedSlideIDs[0]
      ? {
          ...slide,
          elements: slide.elements.concat(element),
        }
      : { ...slide }
  );
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
