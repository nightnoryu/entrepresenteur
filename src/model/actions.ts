import {
  BackgroundType,
  Dimensions,
  Editor,
  ElementType,
  Position,
  Presentation,
  PrimitiveType,
  Slide,
} from './types';
import { generateUUID, UUID } from './uuid';
import {
  concatWithSelectedSlideElements,
  isCurrentElement,
  isCurrentSlide,
  modifyHistoryBeforeAction,
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
      undoStack: [],
      prevState: -1,
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
              ? [newSlide, slide]
              : slide
          ),
    },
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
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
    history: modifyHistoryBeforeAction(editor.history, editor.presentation),
  };
}

function undo(editor: Editor): Editor {
  // TODO: remake with single array
  return { ...editor };
}

function redo(editor: Editor): Editor {
  // TODO: remake with single array
  return { ...editor };
}

function exportPresentation(presentation: Presentation): void {
  // TODO: implement
}
