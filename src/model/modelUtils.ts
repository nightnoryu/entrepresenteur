import { BackgroundType, Editor, Presentation, PrimitiveStrokeStyle, Slide, SlideElement, TextFont } from './types';
import { generateUUID, UUID } from './uuid';
import { DEFAULT_PRESENTATION_TITLE, DEFAULT_SLIDE_BACKGROUND, MAX_HISTORY_ENTRIES } from './constants';

export function moveElementInArray<T>(
  collection: T[],
  oldIndex: number,
  newIndex: number,
): T[] {
  const newCollection = collection.slice();
  newCollection.splice(newIndex, 0, newCollection.splice(oldIndex, 1)[0]);

  return newCollection;
}

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
    title: DEFAULT_PRESENTATION_TITLE,
    slides: [createNewSlide()],
  };
}

export function createEditor(presentation: Presentation): Editor {
  return {
    presentation,
    selections: {
      selectedSlideIDs: presentation.slides.length > 0 ? [presentation.slides[0].id] : [],
      selectedElementIDs: [],
    },
    history: {
      pastStates: [],
      futureStates: [],
    },
    isDemonstrating: false,
  };
}

export function mapFontToString(font: TextFont): string {
  switch (font) {
  case TextFont.SERIF:
    return 'Noto Serif';
  case TextFont.SANS_SERIF:
    return 'Roboto';
  case TextFont.MONOSPACE:
    return 'IBM Plex Mono';
  }
}

export function tryMapStringToFont(str: string): TextFont {
  switch (str) {
  case 'Noto Serif':
    return TextFont.SERIF;
  case 'Roboto':
    return TextFont.SANS_SERIF;
  case 'IBM Plex Mono':
    return TextFont.MONOSPACE;
  default:
    throw new Error('Unknown font');
  }
}

export function mapStrokeStyleToString(style: PrimitiveStrokeStyle): string {
  switch (style) {
  case PrimitiveStrokeStyle.SOLID:
    return 'Solid';
  case PrimitiveStrokeStyle.DASHED:
    return 'Dashed';
  case PrimitiveStrokeStyle.DOT_DASHED:
    return 'Dot-dashed';
  }
}

export function tryMapStringToStrokeStyle(str: string): PrimitiveStrokeStyle {
  switch (str) {
  case 'Solid':
    return PrimitiveStrokeStyle.SOLID;
  case 'Dashed':
    return PrimitiveStrokeStyle.DASHED;
  case 'Dot-dashed':
    return PrimitiveStrokeStyle.DOT_DASHED;
  default:
    throw new Error('Unknown stroke style');
  }
}

export function concatWithSelectedSlideElements(
  editor: Editor,
  element: SlideElement,
): Slide[] {
  return editor.presentation.slides.map(slide =>
    isCurrentSlide(slide, editor.selections.selectedSlideIDs)
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

export function selectNearestUnselectedSlide(editor: Editor): UUID[] {
  const firstSelectedSlideIndex = editor.presentation.slides.findIndex(slide => isCurrentSlide(slide, editor.selections.selectedSlideIDs));

  if (firstSelectedSlideIndex > 0) {
    return [editor.presentation.slides[firstSelectedSlideIndex - 1].id];
  }

  const newSlides = editor.presentation.slides.filter(slide => !editor.selections.selectedSlideIDs.includes(slide.id));

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

export function getCurrentSlideIndex(editor: Editor): number {
  return editor.presentation.slides.reduce(
    (savedIndex, slide, index) => isCurrentSlide(slide, editor.selections.selectedSlideIDs)
      ? index
      : savedIndex,
    -1,
  );
}

export function getUnselectedSlideIDs(editor: Editor): UUID[] {
  return editor.presentation.slides.flatMap(
    slide => !editor.selections.selectedSlideIDs.includes(slide.id) ? slide.id : [],
  );
}

export function changeSlidesOrder(editor: Editor, slideIDs: UUID[]): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: slideIDs.flatMap(
        slideID =>
          editor.presentation.slides.find(slide => slide.id === slideID) || [],
      ),
    },
  };
}

export function saveState(editor: Editor, newEditor: Editor): Editor {
  if (editor !== newEditor) {
    const historyState = {
      presentation: editor.presentation,
      selections: editor.selections,
    };

    return {
      ...newEditor,
      history: {
        pastStates: newEditor.history.pastStates.length < MAX_HISTORY_ENTRIES
          ? [...newEditor.history.pastStates, historyState]
          : [...newEditor.history.pastStates.slice(1), historyState],
        futureStates: [],
      },
    };
  }

  return newEditor;
}
