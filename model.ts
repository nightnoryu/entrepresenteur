type Position = {
    x: number;
    y: number;
}

type Dimensions = {
    width: number;
    height: number;
}

type UUID = string

enum ElementType {
    TEXT,
    IMAGE,
    PRIMITIVE,
}

type SlideElement = {
    id: UUID;
    type: ElementType;
    position: Position;
    dimensions: Dimensions;
}

type TextElement = SlideElement & {
    type: ElementType.TEXT;
    value: string;
    size: number;
    font: string;
    color: string;
}

type ImageElement = SlideElement & {
    type: ElementType.IMAGE;
    src: string;
}

enum PrimitiveType {
    RECTANGLE,
    SQUARE,
    ELLIPSE,
    CIRCLE,
    TRIANGLE,
}

type PrimitiveElement = SlideElement & {
    type: ElementType.PRIMITIVE;
    primitiveType: PrimitiveType;
    fill: string;
    stroke: string;
}

enum BackgroundType {
    SOLID,
    IMAGE,
}

type Background = {
    type: BackgroundType;
}

type SolidBackground = Background & {
    type: BackgroundType.SOLID;
    color: string;
}

type ImageBackground = Background & {
    type: BackgroundType.SOLID;
    src: string;
}

type Slide = {
    id: UUID;
    background: Background;
    elements: SlideElement[];
}

type Presentation = {
    title: string;
    slides: Slide[];
}

type Editor = {
    presentation: Presentation;
    currentSlide: Slide;
    selectedSlideIDs: UUID[];
    selectedElements: number[];
    // TODO: history
}

export {
    Position,
    Dimensions,
    UUID,
    ElementType,
    SlideElement,
    TextElement,
    ImageElement,
    PrimitiveType,
    PrimitiveElement,
    BackgroundType,
    Background,
    SolidBackground,
    ImageBackground,
    Slide,
    Presentation,
    Editor,
}
