import { BackgroundType, Dimensions, Editor, ElementType, Position, Presentation, PrimitiveType, Slide, SlideElement, } from "./model";
import { UUID, generateUUID } from "./uuid";

function createNewSlide(): Slide {
    return {
        id: generateUUID(),
        background: {
            type: BackgroundType.SOLID,
            color: '#FFF',
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
        presentation: presentation,
        selectedSlideIDs: [presentation.slides[0].id],
        selectedElementIDs: [],
    };
}

function loadPresentation(file: string): Presentation {
    return JSON.parse(file);
}

function savePresentation(presentation: Presentation): string {
    return JSON.stringify(presentation);
}

function setPresentationTitle(presentation: Presentation, title: string): Presentation {
    return {
        ...presentation,
        title: title,
    };
}

function addSlide(editor: Editor): Editor {
    const slides: Slide[] = editor.presentation.slides.slice();
    const slide: Slide = createNewSlide();

    let currentSlideIndex: number = 0;
    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === editor.selectedSlideIDs[0]) {
            currentSlideIndex = i;
        }
    }

    slides.splice(currentSlideIndex, 0, slide);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function removeSlides(editor: Editor): Editor {
    const slides: Slide[] = editor.presentation.slides.slice();
    const newSlides = slides.filter(slide => !editor.selectedSlideIDs.includes(slide.id));

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
}

function changeSlidesOrder(editor: Editor, slideIDs: UUID[]): Editor {
    const slideIDToSlideMap = new Map<UUID, Slide>();
    for (const slide of editor.presentation.slides) {
        slideIDToSlideMap.set(slide.id, slide);
    }

    const newSlides: Slide[] = [];
    for (const slideID of slideIDs) {
        newSlides.push(slideIDToSlideMap.get(slideID))
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
}

function setCurrentSlide(editor: Editor, slideID: UUID): Editor {
    const slides: Slide[] = editor.presentation.slides.slice();
    let currentSlideID: UUID;

    for (const slide of slides) {
        if (slide.id === slideID) {
            currentSlideID = slide.id
        }
    }

    return {
        ...editor,
        selectedSlideIDs: [currentSlideID],
    };
}

function setSlideBackgroundColor(editor: Editor, color: string): Editor {
    const currentSlide: Slide = {
        ...editor.currentSlide,
        background: {
            type: BackgroundType.SOLID,
            color: color,
        },
    };

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setSlideBackgroundImage(editor: Editor, src: string): Editor {
    const currentSlide: Slide = {
        ...editor.currentSlide,
        background: {
            type: BackgroundType.IMAGE,
            src: src,
        },
    };

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function removeElements(editor: Editor): Editor {
    const elements: SlideElement[] = editor.currentSlide.elements.slice();
    const newElements = elements.filter(element => !editor.selectedElementIDs.includes(element.id));

    const currentSlide = {
        ...editor.currentSlide,
        elements: newElements,
    }

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function addText(editor: Editor, position: Position, dimensions: Dimensions, value: string): Editor {
    const elements: SlideElement[] = editor.currentSlide.elements.slice();
    elements.push({
        id: generateUUID(),
        type: ElementType.TEXT,
        position: position,
        dimensions: dimensions,
        value: value,
        size: 10,
        font: 'Calibri',
        color: '#000000',
    });

    const currentSlide = {
        ...editor.currentSlide,
        elements: elements,
    }

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setTextValue(editor: Editor, textElementID: UUID, value: string): Editor {
    const elements: SlideElement[] = [];
    for (const element of editor.currentSlide.elements) {
        if (element.id === textElementID && element.type === ElementType.TEXT) {
            elements.push({
                ...element,
                value: value,
            });
        } else {
            elements.push(element);
        }
    }
    
    const currentSlide = {
        ...editor.currentSlide,
        elements: elements,
    }

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setTextFont(editor: Editor, textElementID: UUID, font: string): Editor {
    const elements: SlideElement[] = [];
    for (const element of editor.currentSlide.elements) {
        if (element.id === textElementID && element.type === ElementType.TEXT) {
            elements.push({
                ...element,
                font: font,
            });
        } else {
            elements.push(element);
        }
    }
    
    const currentSlide = {
        ...editor.currentSlide,
        elements: elements,
    }

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setTextSize(editor: Editor, textElementID: UUID, size: number): Editor {
    const elements: SlideElement[] = [];
    for (const element of editor.currentSlide.elements) {
        if (element.id === textElementID && element.type === ElementType.TEXT) {
            elements.push({
                ...element,
                size: size,
            });
        } else {
            elements.push(element);
        }
    }
    
    const currentSlide = {
        ...editor.currentSlide,
        elements: elements,
    }

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function addImage(editor: Editor, position: Position, dimensions: Dimensions, src: string): Editor {
    const elements: SlideElement[] = editor.currentSlide.elements.slice();
    elements.push({
        id: generateUUID(),
        type: ElementType.IMAGE,
        position: position,
        dimensions: dimensions,
        src: src,
    });

    const currentSlide = {
        ...editor.currentSlide,
        elements: elements,
    }

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function moveElement(editor: Editor, elementID: UUID, position: Position): Editor {
    const elements: SlideElement[] = editor.currentSlide.elements.slice();
    for (let i = 0; i < elements.length; ++i) {
        if (elements[i].id === elementID) {
            elements[i] = {
                ...elements[i],
                position: position,
            }
        }
    }

    const currentSlide = {
        ...editor.currentSlide,
        elements: elements,
    }

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function addPrimitive(editor: Editor, position: Position, dimensions: Dimensions, primitiveType: PrimitiveType): Editor {
    const elements: SlideElement[] = editor.currentSlide.elements.slice();
    elements.push({
        id: generateUUID(),
        type: ElementType.PRIMITIVE,
        position: position,
        dimensions: dimensions,
        primitiveType: primitiveType,
        fill: '#FFFFFF',
        stroke: '#000000',
    });

    const currentSlide = {
        ...editor.currentSlide,
        elements: elements,
    }

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setPrimitiveFillColor(editor: Editor, primitiveElementID: UUID, fill: string): Editor {
    const elements: SlideElement[] = [];
    for (const element of editor.currentSlide.elements) {
        if (element.id === primitiveElementID && element.type === ElementType.PRIMITIVE) {
            elements.push({
                ...element,
                fill: fill,
            });
        } else {
            elements.push(element);
        }
    }
    
    const currentSlide = {
        ...editor.currentSlide,
        elements: elements,
    }

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setPrimitiveStrokeColor(editor: Editor, primitiveElementID: UUID, stroke: string): Editor {
    const elements: SlideElement[] = [];
    for (const element of editor.currentSlide.elements) {
        if (element.id === primitiveElementID && element.type === ElementType.PRIMITIVE) {
            elements.push({
                ...element,
                stroke: stroke,
            });
        } else {
            elements.push(element);
        }
    }
    
    const currentSlide = {
        ...editor.currentSlide,
        elements: elements,
    }

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function resizeElement(editor: Editor, elementID: UUID, dimensions: Dimensions): Editor {
    const elements: SlideElement[] = editor.currentSlide.elements.slice();
    for (let i = 0; i < elements.length; ++i) {
        if (elements[i].id === elementID) {
            elements[i] = {
                ...elements[i],
                dimensions: dimensions,
            }
        }
    }

    const currentSlide = {
        ...editor.currentSlide,
        elements: elements,
    }

    const slides = replaceCurrentSlideInSlides(editor.presentation.slides, currentSlide);

    return {
        ...editor,
        currentSlide: currentSlide,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}


/**
 * TODO
 * @param {Editor} editor
 * @returns {Editor}
 */
function undo(editor) { }

/**
 * TODO
 * @param {Editor} editor
 * @returns {Editor}
 */
function redo(editor) { }

/**
 * TODO
 * @param {Presentation} presentation
 * @returns {PDF}
 */
function exportPresentation(presentation) { }
