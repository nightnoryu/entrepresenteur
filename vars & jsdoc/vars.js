const slideUUID = '591844da-21e7-11ec-9621-0242ac130002';
const elementUUID = '591844da-21e7-11ec-9621-0242ac130003';

const position = {
    x: 200,
    y: 300,
}

const dimensions = {
    width: 300,
    height: 100,
}

const genericSlideElement = {
    id: elementUUID,
    type: '',
    position: position,
    dimensions: dimensions,
}

const textElement = {
    ...genericSlideElement,
    type: 'TEXT',
    value: 'Hello, world!',
    size: 12,
    font: 'sans-serif',
    color: '#000000',
}

const imageElement = {
    ...genericSlideElement,
    type: 'IMAGE',
    src: 'data:image/png;base64,blahblahblah',
}

const primitiveElement = {
    ...genericSlideElement,
    type :'PRIMITIVE',
    primitiveType: 'RECTANGLE',
    fill: '#FFFFFF',
    stroke: '#000000',
}

const background = {
    type: '',
}

const solidBackground = {
    ...background,
    type: 'SOLID',
    color: '#FF0000'
}

const imageBackground = {
    ...background,
    type: 'IMAGE',
    src: 'data:image/png;base64,blahblahblah',
}

const slide = {
    id: slideUUID,
    background: solidBackground,
    elements: [textElement],
}

const presentation = {
    title: 'Super presentation',
    slides: [slide],
}

const editor = {
    presentation: presentation,
    selectedSlideIDs: [slideUUID],
    selectedElementIDs: [elementUUID],
}
