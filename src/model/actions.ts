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
import { findCurrentSlideIndex } from './utils';

function createNewSlide(): Slide {
  return {
    id: generateUUID(),
    background: {
      type: BackgroundType.SOLID,
      color: '#FFFFFF',
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
  let selectedSlideIDs: UUID[] = [];
  if (presentation.slides.length > 0) {
    selectedSlideIDs = [presentation.slides[0].id];
  }

  return {
    presentation,
    selectedSlideIDs,
    selectedElementIDs: [],
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
  let slides: Slide[] = [];
  const selectedSlideIDs = [slide.id];

  if (slides.length === 0) {
    slides = [slide];
  } else {
    const currentSlideIndex = findCurrentSlideIndex(
      slides,
      editor.selectedSlideIDs
    );
    slides.splice(currentSlideIndex, 0, slide);
  }

  return {
    ...editor,
    selectedSlideIDs,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function removeSlides(editor: Editor): Editor {
  const slides = editor.presentation.slides.filter(
    slide => !editor.selectedSlideIDs.includes(slide.id)
  );

  let selectedSlideIDs: UUID[] = [];
  if (slides.length > 0) {
    selectedSlideIDs = [slides[0].id];
  }

  return {
    ...editor,
    selectedSlideIDs,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function changeSlidesOrder(editor: Editor, slideIDs: UUID[]): Editor {
  const slideIDToSlideMap = new Map<UUID, Slide>();
  for (const slide of editor.presentation.slides) {
    slideIDToSlideMap.set(slide.id, slide);
  }

  const slides = slideIDs.flatMap(slideID => {
    const optionalSlideID = slideIDToSlideMap.get(slideID);
    return optionalSlideID !== undefined ? [optionalSlideID] : [];
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
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
  let selectedSlideIDs = editor.selectedSlideIDs.concat(slideID);

  selectedSlideIDs = editor.presentation.slides.flatMap(slide => {
    return selectedSlideIDs.includes(slide.id) ? [slide.id] : [];
  });

  return {
    ...editor,
    selectedSlideIDs,
  };
}

function setSlideBackgroundColor(editor: Editor, color: string): Editor {
  if (editor.selectedSlideIDs.length === 0) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const background: SolidBackground = {
        type: BackgroundType.SOLID,
        color,
      };

      return {
        ...slide,
        background,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function setSlideBackgroundImage(editor: Editor, src: string): Editor {
  if (editor.selectedSlideIDs.length === 0) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const background: ImageBackground = {
        type: BackgroundType.IMAGE,
        src,
      };

      return {
        ...slide,
        background,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function removeElements(editor: Editor): Editor {
  if (
    editor.selectedSlideIDs.length === 0 ||
    editor.selectedElementIDs.length === 0
  ) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const elements = slide.elements.filter(
        element => !editor.selectedElementIDs.includes(element.id)
      );

      return {
        ...slide,
        elements,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function addText(
  editor: Editor,
  position: Position,
  dimensions: Dimensions,
  value: string
): Editor {
  if (editor.selectedSlideIDs.length === 0) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const elements = slide.elements.concat({
        id: generateUUID(),
        type: ElementType.TEXT,
        position,
        dimensions,
        value,
        size: 10,
        font: 'Calibri',
        color: '#000000',
      });

      return {
        ...slide,
        elements,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function setTextValue(editor: Editor, value: string): Editor {
  if (
    editor.selectedSlideIDs.length === 0 ||
    editor.selectedElementIDs.length !== 1
  ) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];
  const selectedElementID = editor.selectedElementIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const elements = slide.elements.map(element => {
        if (
          element.type === ElementType.PRIMITIVE &&
          element.id === selectedElementID
        ) {
          return {
            ...element,
            value,
          };
        }

        return element;
      });

      return {
        ...slide,
        elements,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function setTextFont(editor: Editor, font: string): Editor {
  if (
    editor.selectedSlideIDs.length === 0 ||
    editor.selectedElementIDs.length !== 1
  ) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];
  const selectedElementID = editor.selectedElementIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const elements = slide.elements.map(element => {
        if (
          element.type === ElementType.PRIMITIVE &&
          element.id === selectedElementID
        ) {
          return {
            ...element,
            font,
          };
        }

        return element;
      });

      return {
        ...slide,
        elements,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function setTextSize(editor: Editor, size: number): Editor {
  if (
    editor.selectedSlideIDs.length === 0 ||
    editor.selectedElementIDs.length !== 1
  ) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];
  const selectedElementID = editor.selectedElementIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const elements = slide.elements.map(element => {
        if (
          element.type === ElementType.TEXT &&
          element.id === selectedElementID
        ) {
          return {
            ...element,
            size,
          };
        }

        return element;
      });

      return {
        ...slide,
        elements,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function addImage(
  editor: Editor,
  position: Position,
  dimensions: Dimensions,
  src: string
): Editor {
  if (editor.selectedSlideIDs.length === 0) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const elements = slide.elements.concat({
        id: generateUUID(),
        type: ElementType.IMAGE,
        position,
        dimensions,
        src,
      });

      return {
        ...slide,
        elements,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function addPrimitive(
  editor: Editor,
  position: Position,
  dimensions: Dimensions,
  primitiveType: PrimitiveType
): Editor {
  if (editor.selectedSlideIDs.length === 0) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const elements = slide.elements.concat({
        id: generateUUID(),
        type: ElementType.PRIMITIVE,
        primitiveType,
        position,
        dimensions,
        fill: '#FFFFFF',
        stroke: '#000000',
      });

      return {
        ...slide,
        elements,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function setPrimitiveFillColor(editor: Editor, fill: string): Editor {
  if (
    editor.selectedSlideIDs.length === 0 ||
    editor.selectedElementIDs.length !== 1
  ) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];
  const selectedElementID = editor.selectedElementIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const elements = slide.elements.map(element => {
        if (
          element.type === ElementType.PRIMITIVE &&
          element.id === selectedElementID
        ) {
          return {
            ...element,
            fill,
          };
        }

        return element;
      });

      return {
        ...slide,
        elements,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function setPrimitiveStrokeColor(editor: Editor, stroke: string): Editor {
  if (
    editor.selectedSlideIDs.length === 0 ||
    editor.selectedElementIDs.length !== 1
  ) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];
  const selectedElementID = editor.selectedElementIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const elements = slide.elements.map(element => {
        if (
          element.type === ElementType.PRIMITIVE &&
          element.id === selectedElementID
        ) {
          return {
            ...element,
            stroke,
          };
        }

        return element;
      });

      return {
        ...slide,
        elements,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function moveElement(editor: Editor, position: Position): Editor {
  if (
    editor.selectedSlideIDs.length === 0 ||
    editor.selectedElementIDs.length !== 1
  ) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];
  const selectedElementID = editor.selectedElementIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const elements = slide.elements.map(element => {
        if (element.id === selectedElementID) {
          return {
            ...element,
            position,
          };
        }

        return element;
      });

      return {
        ...slide,
        elements,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function resizeElement(editor: Editor, dimensions: Dimensions): Editor {
  if (
    editor.selectedSlideIDs.length === 0 ||
    editor.selectedElementIDs.length !== 1
  ) {
    return { ...editor };
  }

  const selectedSlideID = editor.selectedSlideIDs[0];
  const selectedElementID = editor.selectedElementIDs[0];

  const slides = editor.presentation.slides.map(slide => {
    if (slide.id === selectedSlideID) {
      const elements = slide.elements.map(element => {
        if (element.id === selectedElementID) {
          return {
            ...element,
            dimensions,
          };
        }

        return element;
      });

      return {
        ...slide,
        elements,
      };
    }

    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides,
    },
  };
}

function undo(editor: Editor): Editor {
  // TODO
  return { ...editor };
}

function redo(editor: Editor): Editor {
  // TODO
  return { ...editor };
}

function exportPresentation(presentation: Presentation): void {
  // TODO
}
