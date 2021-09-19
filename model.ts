const position = {
    x,
    y,
}

const dimensions = {
    width,
    height,
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
    src,
}

const primitive = {
    ...element,
    primitiveType, // Rectangle | Circle | Triangle
    fill,
    stroke,
}

const background = {
    type, // Solid | Image
}

const solidBackground = {
    ...background,
    color,
}

const imageBackground = {
    ...background,
    src,
}

const slide = {
    background,
    elements, // []element
}

const presentation = {
    title,
    slides, // []slide
}

// TODO: store diffs instead of full states
const history = {
    states, // []presentation
    currentStateIndex,
}

const editor = {
    presentation,
    currentSlide,
    selectedSlides,
    selectedElements,
    history,
}
