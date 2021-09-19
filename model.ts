const position = {
    x,
    y,
}

const dimensions = {
    width,
    height,
}

const color = {
    color,
    backgroundType, // Color
}

const element = {
    type,     // Text | Image | Primitive
    position,
    dimensions,
}

const text = {
    ...element,
    value,
    size,
    font,
    color,
}

const image = {
    ...element,
    backgroundType, // Image
    src,
}

const primitive = {
    ...element,
    primitiveType, // Rectangle | Circle | Triangle
    stroke,
    fill,
}

const slide = {
    background,
    elements,
}

const presentation = {
    title,
    slides,
}

const editor = {
    presentation,
    currentSlide,
    selectedSlides,
    selectedElements,
    history,
}

const history = {
    states,
    currentState,
}
