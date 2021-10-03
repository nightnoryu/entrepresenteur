import {Dimensions, Editor, Position, Presentation, PrimitiveType} from "../types & ts functions/model";
import {UUID} from "../types & ts functions/uuid";

/**
 * @returns {Slide}
 */
function createNewSlide() { }

/**
 * @returns {Presentation}
 */
function createNewPresentation() { }

/**
 * @returns {Editor}
 */
function createEditor(presentation: Presentation) { }

/**
 * @returns {Presentation}
 */
function loadPresentation(file: string) { }

/**
 * @returns {string}
 */
function savePresentation(presentation: Presentation) { }

/**
 * @returns {Presentation}
 */
function setPresentationTitle(presentation: Presentation, title: string) { }

/**
 * @returns {Editor}
 */
function addSlide(editor: Editor) { }

/**
 * @returns {Editor}
 */
function removeSlides(editor: Editor) { }

/**
 * @returns {Editor}
 */
function changeSlidesOrder(editor: Editor, slideIDs: UUID[]) { }

/**
 * @returns {Editor}
 */
function setCurrentSlide(editor: Editor, slideID: UUID) { }

/**
 * @returns {Editor}
 */
function setSlideBackgroundColor(editor: Editor, color: string) { }

/**
 * @returns {Editor}
 */
function setSlideBackgroundImage(editor: Editor, src: string) { }

/**
 * @returns {Editor}
 */
function removeElements(editor: Editor) { }

/**
 * @returns {Editor}
 */
function addText(editor: Editor, position: Position, dimensions: Dimensions, value: string) { }

/**
 * @returns {Editor}
 */
function setTextValue(editor: Editor, textElementID: UUID, value: string) { }

/**
 * @returns {Editor}
 */
function setTextFont(editor: Editor, textElementID: UUID, font: string) { }

/**
 * @returns {Editor}
 */
function setTextSize(editor: Editor, textElementID: UUID, size: number) { }

/**
 * @returns {Editor}
 */
function addImage(editor: Editor, position: Position, dimensions: Dimensions, src: string) { }

/**
 * @returns {Editor}
 */
function moveElement(editor: Editor, elementID: UUID, position: Position) { }

/**
 * @returns {Editor}
 */
function addPrimitive(editor: Editor, position: Position, dimensions: Dimensions, primitiveType: PrimitiveType) { }

/**
 * @returns {Editor}
 */
function setPrimitiveFillColor(editor: Editor, primitiveElementID: UUID, fill: string) { }

/**
 * @returns {Editor}
 */
function setPrimitiveStrokeColor(editor: Editor, primitiveElementID: UUID, stroke: string) { }

/**
 * @returns {Editor}
 */
function resizeElement(editor: Editor, elementID: UUID, dimensions: Dimensions) { }

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