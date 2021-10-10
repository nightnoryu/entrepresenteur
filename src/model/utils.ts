import { Slide } from './model';
import { UUID } from './uuid';

export function findCurrentSlideIndex(
  slides: Array<Slide>,
  selectedSlideIDs: Array<UUID>
): number {
  const selectedSlideID = selectedSlideIDs[0];
  return slides.findIndex(slide => slide.id === selectedSlideID);
}
