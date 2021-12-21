import { BackgroundType, Dimensions, Editor, ElementType, Position, Presentation, PrimitiveType } from './types';
import { generateUUID, UUID } from './uuid';
import {
  concatWithSelectedSlideElements,
  createEditor,
  createNewSlide,
  getCurrentSlideIndex,
  isCurrentSlide,
  moveElementOnTop,
  selectNearestUnselectedSlide,
} from './modelUtils';
import {
  DEFAULT_PRIMITIVE_FILL,
  DEFAULT_PRIMITIVE_STROKE,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT_FONT,
  DEFAULT_TEXT_SIZE,
} from './constants';

export function openPresentation(editor: Editor, presentation: Presentation): Editor {
  return createEditor(presentation);
}

export function setPresentationTitle(
  editor: Editor,
  title: string,
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      title,
    },
  };
}

export function addSlide(editor: Editor): Editor {
  const newSlide = createNewSlide();

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides:
        editor.presentation.slides.length === 0
          ? [newSlide]
          : editor.presentation.slides.flatMap(slide =>
            isCurrentSlide(slide, editor.selections.selectedSlideIDs)
              ? [slide, newSlide]
              : slide,
          ),
    },
    selections: {
      ...editor.selections,
      selectedSlideIDs: [newSlide.id],
    },
  };
}

export function removeSlides(editor: Editor): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.filter(
        slide => !editor.selections.selectedSlideIDs.includes(slide.id),
      ),
    },
    selections: {
      ...editor.selections,
      selectedSlideIDs: selectNearestUnselectedSlide(editor),
    },
  };
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

export function setCurrentSlide(editor: Editor, slideID: UUID): Editor {
  return {
    ...editor,
    selections: {
      ...editor.selections,
      selectedSlideIDs: [slideID],
      selectedElementIDs: [],
    },
  };
}

export function selectSlide(editor: Editor, slideID: UUID): Editor {
  return {
    ...editor,
    selections: {
      ...editor.selections,
      selectedSlideIDs: editor.presentation.slides.flatMap(slide =>
        editor.selections.selectedSlideIDs.concat(slideID).includes(slide.id) ? slide.id : [],
      ),
      selectedElementIDs: [],
    },
  };
}

export function nextSlide(editor: Editor): Editor {
  const currentSlideIndex = getCurrentSlideIndex(editor);

  return {
    ...editor,
    selections: {
      selectedSlideIDs: currentSlideIndex < editor.presentation.slides.length - 1
        ? [editor.presentation.slides[currentSlideIndex + 1].id]
        : editor.selections.selectedSlideIDs,
      selectedElementIDs: [],
    },
  };
}

export function previousSlide(editor: Editor): Editor {
  const currentSlideIndex = getCurrentSlideIndex(editor);

  return {
    ...editor,
    selections: {
      selectedSlideIDs: currentSlideIndex > 0
        ? [editor.presentation.slides[currentSlideIndex - 1].id]
        : editor.selections.selectedSlideIDs,
      selectedElementIDs: [],
    },
  };
}

export function setSlideBackgroundColor(editor: Editor, color: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            background: {
              type: BackgroundType.SOLID,
              color,
            },
          }
          : slide,
      ),
    },
  };
}

export function setSlideBackgroundImage(editor: Editor, src: string): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            background: {
              type: BackgroundType.IMAGE,
              src,
            },
          }
          : slide,
      ),
    },
  };
}

export function removeElements(editor: Editor): Editor {
  return {
    ...editor,
    selections: {
      ...editor.selections,
      selectedElementIDs: [],
    },
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.filter(
              element => !editor.selections.selectedElementIDs.includes(element.id),
            ),
          }
          : { ...slide },
      ),
    },
  };
}

export function addText(
  editor: Editor, {
    position,
    dimensions,
    value,
  }: {
    position: Position;
    dimensions: Dimensions;
    value: string;
  },
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: concatWithSelectedSlideElements(
        editor,
        {
          id: generateUUID(),
          type: ElementType.TEXT,
          position,
          dimensions,
          value,
          size: DEFAULT_TEXT_SIZE,
          font: DEFAULT_TEXT_FONT,
          color: DEFAULT_TEXT_COLOR,
        },
      ),
    },
  };
}

export function setTextValue(
  editor: Editor, {
    elementID,
    value,
  }: {
    elementID: UUID;
    value: string;
  },
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.type === ElementType.TEXT &&
              element.id === elementID
                ? {
                  ...element,
                  value,
                }
                : element,
            ),
          }
          : slide,
      ),
    },
  };
}

export function setTextFont(
  editor: Editor, {
    elementID,
    font,
  }: {
    elementID: UUID;
    font: string;
  },
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.type === ElementType.TEXT &&
              element.id === elementID
                ? {
                  ...element,
                  font,
                }
                : element,
            ),
          }
          : slide,
      ),
    },
  };
}

export function setTextSize(
  editor: Editor, {
    elementID,
    size,
  }: {
    elementID: UUID;
    size: number;
  },
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.type === ElementType.TEXT &&
              element.id === elementID
                ? {
                  ...element,
                  size,
                }
                : element,
            ),
          }
          : slide,
      ),
    },
  };
}

export function setTextColor(
  editor: Editor, {
    elementID,
    color,
  }: {
    elementID: UUID;
    color: string;
  },
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.type === ElementType.TEXT &&
              element.id === elementID
                ? {
                  ...element,
                  color,
                }
                : element,
            ),
          }
          : slide,
      ),
    },
  };
}

export function addImage(
  editor: Editor, {
    position,
    dimensions,
    src,
  }: {
    position: Position,
    dimensions: Dimensions,
    src: string,
  },
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: concatWithSelectedSlideElements(
        editor,
        {
          id: generateUUID(),
          type: ElementType.IMAGE,
          position,
          dimensions,
          src,
        },
      ),
    },
  };
}

export function addPrimitive(
  editor: Editor, {
    position,
    dimensions,
    primitiveType,
  }: {
    position: Position,
    dimensions: Dimensions,
    primitiveType: PrimitiveType,
  },
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: concatWithSelectedSlideElements(
        editor,
        {
          id: generateUUID(),
          type: ElementType.PRIMITIVE,
          primitiveType,
          position,
          dimensions,
          fill: DEFAULT_PRIMITIVE_FILL,
          stroke: DEFAULT_PRIMITIVE_STROKE,
        },
      ),
    },
  };
}

export function setPrimitiveFillColor(
  editor: Editor, {
    elementID,
    fill,
  }: {
    elementID: UUID;
    fill: string;
  },
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.type === ElementType.PRIMITIVE &&
              element.id === elementID
                ? {
                  ...element,
                  fill,
                }
                : element,
            ),
          }
          : slide,
      ),
    },
  };
}

export function setPrimitiveStrokeColor(
  editor: Editor, {
    elementID,
    stroke,
  }: {
    elementID: UUID;
    stroke: string;
  },
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.type === ElementType.PRIMITIVE &&
              element.id === elementID
                ? {
                  ...element,
                  stroke,
                }
                : element,
            ),
          }
          : slide,
      ),
    },
  };
}

export function selectElement(editor: Editor, elementID: UUID): Editor {
  return {
    ...editor,
    selections: {
      ...editor.selections,
      selectedElementIDs: editor.selections.selectedElementIDs.concat(elementID),
    },
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(
        slide => isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            elements: moveElementOnTop(slide.elements, elementID),
          } : slide,
      ),
    },
  };
}

export function unselectElement(editor: Editor, elementID: UUID): Editor {
  return {
    ...editor,
    selections: {
      ...editor.selections,
      selectedElementIDs: editor.selections.selectedElementIDs.filter(id => id != elementID),
    },
  };
}

export function moveElements(
  editor: Editor,
  positionDiff: Position,
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              editor.selections.selectedElementIDs.includes(element.id)
                ? {
                  ...element,
                  position: {
                    x: element.position.x + positionDiff.x,
                    y: element.position.y + positionDiff.y,
                  },
                }
                : element,
            ),
          }
          : slide,
      ),
    },
  };
}

export function resizeElement(
  editor: Editor,
  {
    elementID,
    dimensions,
  }: {
    elementID: UUID;
    dimensions: Dimensions;
  },
): Editor {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        isCurrentSlide(slide, editor.selections.selectedSlideIDs)
          ? {
            ...slide,
            elements: slide.elements.map(element =>
              element.id === elementID
                ? {
                  ...element,
                  dimensions,
                }
                : element,
            ),
          }
          : slide,
      ),
    },
  };
}

export function undo(editor: Editor): Editor {
  return editor.history.pastStates.length > 0
    ? {
      ...editor,
      presentation: editor.history.pastStates[editor.history.pastStates.length - 1],
      history: {
        pastStates: editor.history.pastStates.slice(0, editor.history.pastStates.length - 1),
        futureStates: [editor.presentation, ...editor.history.futureStates],
      },
    }
    : editor;
}

export function redo(editor: Editor): Editor {
  return editor.history.futureStates.length > 0
    ? {
      ...editor,
      presentation: editor.history.futureStates[0],
      history: {
        pastStates: [...editor.history.pastStates, editor.presentation],
        futureStates: editor.history.futureStates.slice(1),
      },
    }
    : editor;
}

export function exportPresentation(presentation: Presentation): void {
  // TODO: implement
}
