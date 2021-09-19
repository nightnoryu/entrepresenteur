/**
 * @returns {Presentation}
 */
function createPresentation() { }

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
 * @returns {PDF}
 */
function exportPresentation(presentation) { }

/**
 * @param {Presentation} presentation
 * @param {string} title
 * @returns {Presentation}
 */
function setPresentationTitle(presentation, title) { }

/**
 * @param {Editor} editor
 * @returns {Editor}
 */
function undo(editor) { }

/**
 * @param {Editor} editor
 * @returns {Editor}
 */
 function redo(editor) { }

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
 * @param {number} index
 * @returns {Editor}
 */
function moveSlides(editor, index) { }

/**
 * @param {Editor} editor
 * @param {number} index
 * @returns {Editor}
 */
 function setCurrentSlide(editor, index) { }
