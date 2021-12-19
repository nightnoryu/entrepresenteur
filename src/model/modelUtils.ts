import { BackgroundType, Editor, Presentation, Slide, SlideElement } from './types';
import { generateUUID, UUID } from './uuid';
import { DEFAULT_PRESENTATION_NAME, DEFAULT_SLIDE_BACKGROUND, MAX_HISTORY_ENTRIES } from './constants';

export function createNewSlide(): Slide {
  return {
    id: generateUUID(),
    background: {
      type: BackgroundType.SOLID,
      color: DEFAULT_SLIDE_BACKGROUND,
    },
    elements: [],
  };
}

export function createNewPresentation(): Presentation {
  return {
    title: DEFAULT_PRESENTATION_NAME,
    slides: [createNewSlide()],
  };
}

export function createEditor(presentation: Presentation): Editor {
  return {
    presentation,
    selectedSlideIDs:
      presentation.slides.length > 0 ? [presentation.slides[0].id] : [],
    selectedElementIDs: [],
    history: {
      pastStates: [],
      futureStates: [],
    },
  };
}

export function concatWithSelectedSlideElements(
  slides: Slide[],
  selectedSlideIDs: UUID[],
  element: SlideElement,
): Slide[] {
  return slides.map(slide =>
    isCurrentSlide(slide, selectedSlideIDs)
      ? {
        ...slide,
        elements: slide.elements.concat(element),
      }
      : { ...slide },
  );
}

export function isCurrentSlide(
  slide: Slide,
  selectedSlideIDs: UUID[],
): boolean {
  return slide.id === selectedSlideIDs[0];
}

export function isCurrentElement(
  element: SlideElement,
  selectedElementIDs: UUID[],
): boolean {
  return element.id === selectedElementIDs[0];
}

export function selectNearestUnselectedSlide(
  slides: Slide[],
  selectedSlideIDs: UUID[],
): UUID[] {
  const firstSelectedSlideIndex = slides.findIndex(slide => isCurrentSlide(slide, selectedSlideIDs));

  if (firstSelectedSlideIndex > 0) {
    return [slides[firstSelectedSlideIndex - 1].id];
  }

  const newSlides = slides.filter(slide => !selectedSlideIDs.includes(slide.id));

  if (newSlides.length === 0) {
    return [];
  }

  return [newSlides[0].id];
}

export function moveElementOnTop(elements: SlideElement[], elementID: UUID): SlideElement[] {
  elements.map((element, i) => {
    if (element.id === elementID) {
      elements.splice(i, 1);
      elements.push(element);
    }
  });

  return elements;
}

export function saveState(editor: Editor, newEditor: Editor): Editor {
  return {
    ...newEditor,
    history: {
      pastStates: newEditor.history.pastStates.length < MAX_HISTORY_ENTRIES
        ? [...newEditor.history.pastStates, editor.presentation]
        : [...newEditor.history.pastStates.slice(1), editor.presentation],
      futureStates: [],
    },
  };
}
