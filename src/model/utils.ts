import { Slide } from './types';
import { UUID } from './uuid';

/**
 * Returns a copy of array with the value inserted at the specified index
 */
export function insertAt<T>(
  arr: T[],
  valueToInsert: T,
  insertIndex: number
): T[] {
  return arr.reduce(
    (result, value, index) =>
      index === insertIndex
        ? result.concat(valueToInsert, value)
        : result.concat(value),
    [] as T[]
  );
}

/**
 * Returns current slide index, if the corresponding slide is present, otherwise -1
 */
export function findCurrentSlideIndex(
  slides: Slide[],
  selectedSlideIDs: UUID[]
): number {
  return slides.findIndex(slide => slide.id === selectedSlideIDs[0]);
}

export function replaceSlide(
  slides: Slide[],
  newSlide: Slide,
  predicate: (slide: Slide) => boolean
): Slide[] {
  return slides.map(slide => (predicate(slide) ? newSlide : slide));
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
