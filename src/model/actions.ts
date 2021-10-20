import {
  BackgroundType,
  Dimensions,
  Editor,
  ElementType,
  ImageBackground,
  Position,
  Presentation,
  PrimitiveType,
  Slide,
  SolidBackground,
} from './types';
import { UUID, generateUUID } from './uuid';
import {
  concatWithSelectedSlideElements,
  insertAt,
  replaceAt,
  selectNearestUnselectedSlide,
} from './utils';

function createNewSlide(): Slide {
  return {
    id: generateUUID(),
    background: {
      type: BackgroundType.SOLID,
      color: '#ffffff',
    },
    elements: [],
  };
}

function createNewPresentation(): Presentation {
  return {
    title: 'New Presentation',
    slides: [createNewSlide()],
  };
}

function createEditor(presentation: Presentation): Editor {
  return {
    presentation,
    selectedSlideIDs:
      presentation.slides.length > 0 ? [presentation.slides[0].id] : [],
    selectedElementIDs: [],
    history: {
      states: [presentation],
      currentState: 0,
    },
  };
}

function serializePresentation(presentation: Presentation): string {
  return JSON.stringify(presentation);
}

function unserializePresentation(json: string): Presentation {
  return JSON.parse(json);
}

function setPresentationTitle(
  presentation: Presentation,
  title: string
): Presentation {
  return {
    ...presentation,
    title,
  };
}

function addSlide(editor: Editor): Editor {
  const slide = createNewSlide();

  return {
    ...editor,
    selectedSlideIDs: [slide.id],
    presentation: {
      ...editor.presentation,
      slides:
        editor.presentation.slides.length === 0
          ? [slide]
          : insertAt(
            editor.presentation.slides,
            slide => slide.id === editor.selectedSlideIDs[0],
            slide
          ),
    },
  };
}

function removeSlides(editor: Editor): Editor {
  return {
    ...editor,
    selectedSlideIDs: [
      selectNearestUnselectedSlide(
        editor.presentation.slides,
        editor.selectedSlideIDs
      ),
    ],
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.filter(
        slide => !editor.selectedSlideIDs.includes(slide.id)
      ),
    },
  };
}

function changeSlidesOrder(editor: Editor, slideIDs: UUID[]): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: slideIDs.flatMap(
        slideID =>
          editor.presentation.slides.find(slide => slide.id === slideID) || []
      ),
    },
  };
}

function setCurrentSlide(editor: Editor, slideID: UUID): Editor {
  return {
    ...editor,
    selectedSlideIDs: [slideID],
  };
}

function selectSlide(editor: Editor, slideID: UUID): Editor {
  return {
    ...editor,
    selectedSlideIDs: editor.presentation.slides.flatMap(slide =>
      editor.selectedSlideIDs.concat(slideID).includes(slide.id) ? slide.id : []
    ),
  };
}

function setSlideBackgroundColor(editor: Editor, color: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: replaceAt(
        editor.presentation.slides,
        slide => slide.id === editor.selectedSlideIDs[0],
        slide => ({
          ...slide,
          background: {
            type: BackgroundType.SOLID,
            color,
          },
        })
      ),
    },
  };
}

function setSlideBackgroundImage(editor: Editor, src: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: replaceAt(
        editor.presentation.slides,
        slide => slide.id === editor.selectedSlideIDs[0],
        slide => ({
          ...slide,
          background: {
            type: BackgroundType.IMAGE,
            src,
          },
        })
      ),
    },
  };
}

function removeElements(editor: Editor): Editor {
  return {
    ...editor,
    selectedElementIDs: [],
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        slide.id === editor.selectedSlideIDs[0]
          ? {
            ...slide,
            elements: slide.elements.filter(
              element => !editor.selectedElementIDs.includes(element.id)
            ),
          }
          : { ...slide }
      ),
    },
  };
}

function addText(
  editor: Editor,
  position: Position,
  dimensions: Dimensions,
  value: string
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: concatWithSelectedSlideElements(
        editor.presentation.slides,
        editor.selectedSlideIDs,
        {
          id: generateUUID(),
          type: ElementType.TEXT,
          position,
          dimensions,
          value,
          size: 10,
          font: 'Calibri',
          color: '#000000',
        }
      ),
    },
  };
}

function setTextValue(editor: Editor, value: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: replaceAt(
        editor.presentation.slides,
        slide => slide.id === editor.selectedSlideIDs[0],
        slide => ({
          ...slide,
          elements: replaceAt(
            slide.elements,
            element =>
              element.type === ElementType.TEXT &&
              element.id === editor.selectedElementIDs[0],
            element => ({
              ...element,
              value,
            })
          ),
        })
      ),
    },
  };
}

function setTextFont(editor: Editor, font: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: replaceAt(
        editor.presentation.slides,
        slide => slide.id === editor.selectedSlideIDs[0],
        slide => ({
          ...slide,
          elements: replaceAt(
            slide.elements,
            element =>
              element.type === ElementType.TEXT &&
              element.id === editor.selectedElementIDs[0],
            element => ({
              ...element,
              font,
            })
          ),
        })
      ),
    },
  };
}

function setTextSize(editor: Editor, size: number): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: replaceAt(
        editor.presentation.slides,
        slide => slide.id === editor.selectedSlideIDs[0],
        slide => ({
          ...slide,
          elements: replaceAt(
            slide.elements,
            element =>
              element.type === ElementType.TEXT &&
              element.id === editor.selectedElementIDs[0],
            element => ({
              ...element,
              size,
            })
          ),
        })
      ),
    },
  };
}

function addImage(
  editor: Editor,
  position: Position,
  dimensions: Dimensions,
  src: string
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: concatWithSelectedSlideElements(
        editor.presentation.slides,
        editor.selectedSlideIDs,
        {
          id: generateUUID(),
          type: ElementType.IMAGE,
          position,
          dimensions,
          src,
        }
      ),
    },
  };
}

function addPrimitive(
  editor: Editor,
  position: Position,
  dimensions: Dimensions,
  primitiveType: PrimitiveType
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: concatWithSelectedSlideElements(
        editor.presentation.slides,
        editor.selectedSlideIDs,
        {
          id: generateUUID(),
          type: ElementType.PRIMITIVE,
          primitiveType,
          position,
          dimensions,
          fill: '#ffffff',
          stroke: '#000000',
        }
      ),
    },
  };
}

function setPrimitiveFillColor(editor: Editor, fill: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: replaceAt(
        editor.presentation.slides,
        slide => slide.id === editor.selectedSlideIDs[0],
        slide => ({
          ...slide,
          elements: replaceAt(
            slide.elements,
            element =>
              element.type === ElementType.PRIMITIVE &&
              element.id === editor.selectedElementIDs[0],
            element => ({
              ...element,
              fill,
            })
          ),
        })
      ),
    },
  };
}

function setPrimitiveStrokeColor(editor: Editor, stroke: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: replaceAt(
        editor.presentation.slides,
        slide => slide.id === editor.selectedSlideIDs[0],
        slide => ({
          ...slide,
          elements: replaceAt(
            slide.elements,
            element =>
              element.type === ElementType.PRIMITIVE &&
              element.id === editor.selectedElementIDs[0],
            element => ({
              ...element,
              stroke,
            })
          ),
        })
      ),
    },
  };
}

function moveElements(editor: Editor, positionDiff: Position): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: replaceAt(
        editor.presentation.slides,
        slide => slide.id === editor.selectedSlideIDs[0],
        slide => ({
          ...slide,
          elements: replaceAt(
            slide.elements,
            element => editor.selectedElementIDs.includes(element.id),
            element => ({
              ...element,
              position: {
                x: element.position.x + positionDiff.x,
                y: element.position.y + positionDiff.y,
              },
            })
          ),
        })
      ),
    },
  };
}

function resizeElement(editor: Editor, dimensions: Dimensions): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: replaceAt(
        editor.presentation.slides,
        slide => slide.id === editor.selectedSlideIDs[0],
        slide => ({
          ...slide,
          elements: replaceAt(
            slide.elements,
            element => element.id === editor.selectedElementIDs[0],
            element => ({
              ...element,
              dimensions,
            })
          ),
        })
      ),
    },
  };
}

// TODO: implement
function undo(editor: Editor): Editor {
  return { ...editor };
}

// TODO: implement
function redo(editor: Editor): Editor {
  return { ...editor };
}

function exportPresentation(presentation: Presentation): void {
  // TODO: implement
}
