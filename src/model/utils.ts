import { Slide } from './types';
import { UUID } from './uuid';

export function findCurrentSlideIndex(
  slides: Slide[],
  selectedSlideIDs: UUID[]
): number {
  const selectedSlideID = selectedSlideIDs[0];
  return slides.findIndex(slide => slide.id === selectedSlideID);
}
