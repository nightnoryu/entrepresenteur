import { BackgroundType, Dimensions, Editor, ElementType, Position, Presentation, PrimitiveType, } from './types';
import { generateUUID, UUID } from './uuid';
import {
  concatWithSelectedSlideElements,
  createNewSlide,
  isCurrentElement,
  isCurrentSlide,
  isRedoAvailable,
  selectNearestUnselectedSlide,
} from './infrastructure_actions';

function serializePresentation(presentation: Presentation): string {
  return JSON.stringify(presentation);
}

function unserializePresentation(json: string): Presentation {
  return JSON.parse(json);
}

export function setPresentationTitle(
  presentation: Presentation,
  title: string
): Presentation {
  return {
    ...presentation,
    title,
  };
}

export function addSlide(editor: Editor): Editor {
  const newSlide = createNewSlide();

  return {
    ...editor,
    selectedSlideIDs: [newSlide.id],
    presentation: {
      ...editor.presentation,
      slides:
        editor.presentation.slides.length === 0
          ? [newSlide]
          : editor.presentation.slides.flatMap(slide =>
            isCurrentSlide(slide, editor.selectedSlideIDs)
              ? [slide, newSlide]
              : slide
          ),
    },
  };
}

function removeSlides(editor: Editor): Editor {
  return {
    ...editor,
    selectedSlideIDs: selectNearestUnselectedSlide(
      editor.presentation.slides,
      editor.selectedSlideIDs
    ),
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

export function selectSlide(editor: Editor, slideID: UUID): Editor {
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
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selectedSlideIDs)
          ? {
            ...slide,
            background: {
              type: BackgroundType.SOLID,
              color,
            },
          }
          : slide
      ),
    },
  };
}

function setSlideBackgroundImage(editor: Editor, src: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selectedSlideIDs)
          ? {
            ...slide,
            background: {
              type: BackgroundType.IMAGE,
              src,
            },
          }
          : slide
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
        isCurrentSlide(slide, editor.selectedSlideIDs)
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
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.type === ElementType.TEXT &&
              isCurrentElement(element, editor.selectedElementIDs)
                ? {
                  ...element,
                  value,
                }
                : element
            ),
          }
          : slide
      ),
    },
  };
}

function setTextFont(editor: Editor, font: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.type === ElementType.TEXT &&
              isCurrentElement(element, editor.selectedElementIDs)
                ? {
                  ...element,
                  font,
                }
                : element
            ),
          }
          : slide
      ),
    },
  };
}

function setTextSize(editor: Editor, size: number): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.type === ElementType.TEXT &&
              isCurrentElement(element, editor.selectedElementIDs)
                ? {
                  ...element,
                  size,
                }
                : element
            ),
          }
          : slide
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
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.type === ElementType.PRIMITIVE &&
              isCurrentElement(element, editor.selectedElementIDs)
                ? {
                  ...element,
                  fill,
                }
                : element
            ),
          }
          : slide
      ),
    },
  };
}

function setPrimitiveStrokeColor(editor: Editor, stroke: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.type === ElementType.PRIMITIVE &&
              isCurrentElement(element, editor.selectedElementIDs)
                ? {
                  ...element,
                  stroke,
                }
                : element
            ),
          }
          : slide
      ),
    },
  };
}

function moveElements(editor: Editor, positionDiff: Position): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              editor.selectedElementIDs.includes(element.id)
                ? {
                  ...element,
                  position: {
                    x: element.position.x + positionDiff.x,
                    y: element.position.y + positionDiff.y,
                  },
                }
                : element
            ),
          }
          : slide
      ),
    },
  };
}

function resizeElement(editor: Editor, dimensions: Dimensions): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              isCurrentElement(element, editor.selectedElementIDs)
                ? {
                  ...element,
                  dimensions,
                }
                : element
            ),
          }
          : slide
      ),
    },
  };
}

function undo(editor: Editor): Editor {
  return {
    ...editor,
    presentation:
      editor.history.currentState > 0
        ? { ...editor.history.undoStack[editor.history.currentState - 1] }
        : editor.presentation,
    history: {
      ...editor.history,
      currentState:
        editor.history.currentState > 0
          ? editor.history.currentState - 1
          : editor.history.currentState,
    },
  };
}

function redo(editor: Editor): Editor {
  return {
    ...editor,
    presentation: isRedoAvailable(editor.history)
      ? { ...editor.history.undoStack[editor.history.currentState + 1] }
      : editor.presentation,
    history: {
      ...editor.history,
      currentState: isRedoAvailable(editor.history)
        ? editor.history.currentState + 1
        : editor.history.currentState,
    },
  };
}

function exportPresentation(presentation: Presentation): void {
  // TODO: implement
}
