import { createEditor, createNewPresentation } from '../modelUtils';
import { addSlide, setFirstCurrentSlide, setPresentationTitle } from '../actions';

const mockEditor = createEditor(createNewPresentation());
const mockTitle = 'Mock title';

test('set presentation title', () => {
  const editor = setPresentationTitle(mockEditor, mockTitle);

  expect(editor.presentation.title).toEqual(mockTitle);
});

test('add slide', () => {
  const editor = addSlide(mockEditor);

  expect(editor.presentation.slides.length).toEqual(2);
  expect(editor.selections.selectedSlideIDs.length).toEqual(1);
  expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[1].id);
});

test('set first current slide', () => {
  const editor = setFirstCurrentSlide(addSlide(addSlide(mockEditor)));

  expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);
});
