import { BackgroundType, Dimensions, Editor, ElementType, Position, Presentation, PrimitiveType, Slide, SlideElement, } from './model';
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
    let selectedSlideIDs: Array<UUID> = [];
    if (presentation.slides.length > 0) {
        selectedSlideIDs = [presentation.slides[0].id];
    }

    return {
        presentation: presentation,
        selectedSlideIDs: selectedSlideIDs,
        selectedElementIDs: [],
    };
}

function serializePresentation(presentation: Presentation): string {
    return JSON.stringify(presentation);
}

function unserializePresentation(json: string): Presentation {
    return JSON.parse(json);
}

function setPresentationTitle(presentation: Presentation, title: string): Presentation {
    return {
        ...presentation,
        title: title,
    };
}

function addSlide(editor: Editor): Editor {
    let slides: Array<Slide> = [];
    const slide = createNewSlide();

    if (slides.length === 0) {
      slides = [slide];
    } else {
      const currentSlideIndex = findCurrentSlideIndex(slides, editor.selectedSlideIDs);
      slides.splice(currentSlideIndex, 0, slide);
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function removeSlides(editor: Editor): Editor {
    const slides = editor.presentation.slides.slice();

    let newSelectedSlidesIDs: Array<UUID> = [];
    for (let i = 0; i < slides.length - 1; ++i) {
        if (slides[i + 1].id === editor.selectedSlideIDs[0]) {
            newSelectedSlidesIDs = [slides[i].id]
        }
    }

    const newSlides = slides.filter(slide => !editor.selectedSlideIDs.includes(slide.id));

    return {
        ...editor,
        selectedSlideIDs: newSelectedSlidesIDs,
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

    const newSlides: Slide[] = slideIDs.map(slideID => slideIDToSlideMap.get(slideID));

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
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
    let selectedSlideIDs = editor.selectedSlideIDs.slice();
    selectedSlideIDs.push(slideID);

    selectedSlideIDs = editor.presentation.slides.map(slide => {
        if (editor.selectedSlideIDs.includes(slide.id)) {
            return slide.id;
        }
    }).filter(selectedSlideID => selectedSlideID !== undefined);

    return {
        ...editor,
        selectedSlideIDs: selectedSlideIDs,
    };
}

function setSlideBackgroundColor(editor: Editor, color: string): Editor {
    if (editor.selectedSlideIDs.length === 0) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            slides[i] = {
                ...slides[i],
                background: {
                    type: BackgroundType.SOLID,
                    color: color,
                }
            }
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setSlideBackgroundImage(editor: Editor, src: string): Editor {
    if (editor.selectedSlideIDs.length === 0) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            slides[i] = {
                ...slides[i],
                background: {
                    type: BackgroundType.IMAGE,
                    src: src,
                }
            }
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function removeElements(editor: Editor): Editor {
    if (editor.selectedSlideIDs.length === 0 || editor.selectedElementIDs.length === 0) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            const elements = slides[i].elements.filter(element => !editor.selectedElementIDs.includes(element.id));

            slides[i] = {
                ...slides[i],
                elements: elements,
            };
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function addText(editor: Editor, position: Position, dimensions: Dimensions, value: string): Editor {
    if (editor.selectedSlideIDs.length === 0) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            const elements = slides[i].elements.slice();
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

            slides[i] = {
                ...slides[i],
                elements: elements,
            }
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setTextValue(editor: Editor, value: string): Editor {
    if (editor.selectedSlideIDs.length === 0 || editor.selectedElementIDs.length !== 1) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const selectedElementID = editor.selectedElementIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            const elements = slides[i].elements.slice();
            for (let j = 0; j < elements.length; ++j) {
                const element = elements[j];
                if (element.type === ElementType.TEXT && element.id === selectedElementID) {
                    elements[j] = {
                        ...element,
                        value: value,
                    };
                    break;
                }
            }
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setTextFont(editor: Editor, font: string): Editor {
    if (editor.selectedSlideIDs.length === 0 || editor.selectedElementIDs.length !== 1) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const selectedElementID = editor.selectedElementIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            const elements = slides[i].elements.slice();
            for (let j = 0; j < elements.length; ++j) {
                const element = elements[j];
                if (element.type === ElementType.TEXT && element.id === selectedElementID) {
                    elements[j] = {
                        ...element,
                        font: font,
                    };
                    break;
                }
            }
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setTextSize(editor: Editor, size: number): Editor {
    if (editor.selectedSlideIDs.length === 0 || editor.selectedElementIDs.length !== 1) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const selectedElementID = editor.selectedElementIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            const elements = slides[i].elements.slice();
            for (let j = 0; j < elements.length; ++j) {
                const element = elements[j];
                if (element.type === ElementType.TEXT && element.id === selectedElementID) {
                    elements[j] = {
                        ...element,
                        size: size,
                    };
                    break;
                }
            }
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function addImage(editor: Editor, position: Position, dimensions: Dimensions, src: string): Editor {
    if (editor.selectedSlideIDs.length === 0) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            const elements = slides[i].elements.slice();
            elements.push({
                id: generateUUID(),
                type: ElementType.IMAGE,
                position: position,
                dimensions: dimensions,
                src: src,
            });

            slides[i] = {
                ...slides[i],
                elements: elements,
            }
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function moveElement(editor: Editor, position: Position): Editor {
    if (editor.selectedSlideIDs.length === 0 || editor.selectedElementIDs.length !== 1) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const selectedElementID = editor.selectedElementIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            const elements = slides[i].elements.slice();
            for (let j = 0; j < elements.length; ++j) {
                if (elements[j].id === selectedElementID) {
                    elements[i] = {
                        ...elements[i],
                        position: position,
                    }
                    break;
                }
            }
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function addPrimitive(editor: Editor, position: Position, dimensions: Dimensions, primitiveType: PrimitiveType): Editor {
    if (editor.selectedSlideIDs.length === 0) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            const elements = slides[i].elements.slice();
            elements.push({
                id: generateUUID(),
                type: ElementType.PRIMITIVE,
                primitiveType: primitiveType,
                position: position,
                dimensions: dimensions,
                fill: '#FFFFFF',
                stroke: '#000000',
            });

            slides[i] = {
                ...slides[i],
                elements: elements,
            }
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setPrimitiveFillColor(editor: Editor, fill: string): Editor {
    if (editor.selectedSlideIDs.length === 0 || editor.selectedElementIDs.length !== 1) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const selectedElementID = editor.selectedElementIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            const elements = slides[i].elements.slice();
            for (let j = 0; j < elements.length; ++j) {
                const element = elements[j];
                if (element.type === ElementType.PRIMITIVE && element.id === selectedElementID) {
                    elements[j] = {
                        ...element,
                        fill: fill,
                    };
                    break;
                }
            }
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function setPrimitiveStrokeColor(editor: Editor, stroke: string): Editor {
    if (editor.selectedSlideIDs.length === 0 || editor.selectedElementIDs.length !== 1) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const selectedElementID = editor.selectedElementIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            const elements = slides[i].elements.slice();
            for (let j = 0; j < elements.length; ++j) {
                const element = elements[j];
                if (element.type === ElementType.PRIMITIVE && element.id === selectedElementID) {
                    elements[j] = {
                        ...element,
                        stroke: stroke,
                    };
                    break;
                }
            }
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
    };
}

function resizeElement(editor: Editor, dimensions: Dimensions): Editor {
    if (editor.selectedSlideIDs.length === 0 || editor.selectedElementIDs.length !== 1) {
        return { ...editor };
    }

    const selectedSlideID = editor.selectedSlideIDs[0];
    const selectedElementID = editor.selectedElementIDs[0];
    const slides = editor.presentation.slides.slice();

    for (let i = 0; i < slides.length; ++i) {
        if (slides[i].id === selectedSlideID) {
            const elements = slides[i].elements.slice();
            for (let j = 0; j < elements.length; ++j) {
                if (elements[j].id === selectedElementID) {
                    elements[i] = {
                        ...elements[i],
                        dimensions: dimensions,
                    }
                    break;
                }
            }
            break;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides,
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
