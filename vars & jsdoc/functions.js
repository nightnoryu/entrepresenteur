/**
 * @returns {Slide}
 */
function createNewSlide() { }

/**
 * @returns {Presentation}
 */
function createNewPresentation() { }

/**
 * @param {Presentation} presentation
 * @returns {Editor}
 */
function createEditor(presentation) { }

/**
 * @param {string} file
 * @returns {Presentation}
 */
function loadPresentation(file) { }

/**
 * @param {Presentation} presentation
 * @returns {string}
 */
function savePresentation(presentation) { }

/**
 * @param {Presentation} presentation
 * @param {title} string
 * @returns {Presentation}
 */
function setPresentationTitle(presentation, string) { }

/**
 * @param {Editor} editor
 * @returns {Editor}
 */
function addSlide(editor) { }

/**
 * @param {Editor} editor
 * @returns {Editor}
 */
function removeSlides(editor) { }

/**
 * @param {Editor} editor
 * @param {UUID[]} slideIDs
 * @returns {Editor}
 */
function changeSlidesOrder(editor, slideIDs) { }

/**
 * @param {Editor} editor
 * @param {UUID} slideID
 * @returns {Editor}
 */
function setCurrentSlide(editor, slideID) { }

/**
 * @param {Editor} editor
 * @param {string} color
 * @returns {Editor}
 */
function setSlideBackgroundColor(editor, color) { }

/**
 * @param {Editor} editor
 * @param {string} src
 * @returns {Editor}
 */
function setSlideBackgroundImage(editor, src) { }

/**
 * @param {Editor} editor
 * @returns {Editor}
 */
function removeElements(editor) { }

/**
 * @param {Editor} editor
 * @param {Position} position
 * @param {Dimensions} dimensions
 * @param {string} value
 * @returns {Editor}
 */
function addText(editor, position, dimensions, value) { }

/**
 * @param {Editor} editor
 * @param {UUID} textElementID
 * @param {string} value
 * @returns {Editor}
 */
function setTextValue(editor, textElementID, value) { }

/**
 * @param {Editor} editor
 * @param {UUID} textElementID
 * @param {string} font
 * @returns {Editor}
 */
function setTextFont(editor, textElementID, font) { }

/**
 * @param {Editor} editor
 * @param {UUID} textElementID
 * @param {number} size
 * @returns {Editor}
 */
function setTextSize(editor, textElementID, size) { }

/**
 * @param {Editor} editor
 * @param {Position} position
 * @param {Dimensions} dimensions
 * @param {string} src
 * @returns {Editor}
 */
function addImage(editor, position, dimensions, src) { }

/**
 * @param {Editor} editor
 * @param {UUID} elementID
 * @param {Position} position
 * @returns {Editor}
 */
function moveElement(editor, elementID, position) { }

/**
 * @param {Editor} editor
 * @param {Position} position
 * @param {Dimensions} dimensions
 * @param {PrimitiveType} primitiveType
 * @returns {Editor}
 */
function addPrimitive(editor, position, dimensions, primitiveType) { }

/**
 * @param {Editor} editor
 * @param {UUID} primitiveElementID
 * @param {string} fill
 * @returns {Editor}
 */
function setPrimitiveFillColor(editor, primitiveElementID, fill) { }

/**
 * @param {Editor} editor
 * @param {UUID} primitiveElementID
 * @param {string} stroke
 * @returns {Editor}
 */
function setPrimitiveStrokeColor(editor, primitiveElementID, stroke) { }

/**
 * @param {Editor} editor
 * @param {UUID} elementID
 * @param {Dimensions} dimensions
 * @returns {Editor}
 */
function resizeElement(editor, elementID, dimensions) { }

/**
 * @returns {Editor}
 */
function undo(editor) { }

/**
 * @returns {Editor}
 */
function redo(editor) { }

/**
 * @returns {Editor}
 */
function exportPresentation(presentation) { }