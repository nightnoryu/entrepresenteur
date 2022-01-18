import { createEditor, createNewPresentation } from '../modelUtils';
import { addSlide, removeSlides, setCurrentSlide, setFirstCurrentSlide, setPresentationTitle } from '../actions';

const mockEditor = createEditor(createNewPresentation());
const mockTitle = 'Mock title';

test('setPresentationTitle', () => {
  const editor = setPresentationTitle(mockEditor, mockTitle);

  expect(editor.presentation.title).toEqual(mockTitle);
});

test('addSlide', () => {
  const editor = addSlide(mockEditor);

  expect(editor.presentation.slides.length).toEqual(2);
  expect(editor.selections.selectedSlideIDs.length).toEqual(1);
  expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[1].id);
});

test('setFirstCurrentSlide', () => {
  const editor = setFirstCurrentSlide(addSlide(addSlide(mockEditor)));

  expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);
});

test('removeSlides', () => {
  const editor = removeSlides(addSlide(mockEditor));

  expect(editor.presentation.slides.length).toEqual(1);
  expect(editor.selections.selectedSlideIDs.length).toEqual(1);
  expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);
});

test('setCurrentSlide', () => {
  const initialEditor = addSlide(mockEditor);
  const editor = setCurrentSlide(initialEditor, initialEditor.presentation.slides[0].id);

  expect(editor.selections.selectedSlideIDs.length).toEqual(1);
  expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);
});
