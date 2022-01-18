import { createEditor, createNewPresentation } from '../modelUtils';
import { addSlide, removeSlides, setCurrentSlide, setFirstCurrentSlide, setPresentationTitle } from '../actions';
import { Editor } from '../types';

describe('Model actions', () => {
  let editor: Editor;
  const mockTitle = 'Mock title';

  beforeEach(() => {
    editor = createEditor(createNewPresentation());
  });

  it('setPresentationTitle', () => {
    editor = setPresentationTitle(editor, mockTitle);

    expect(editor.presentation.title).toEqual(mockTitle);
  });

  it('addSlide', () => {
    editor = addSlide(editor);

    expect(editor.presentation.slides.length).toEqual(2);
    expect(editor.selections.selectedSlideIDs.length).toEqual(1);
    expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[1].id);
  });

  it('setFirstCurrentSlide', () => {
    editor = setFirstCurrentSlide(addSlide(addSlide(editor)));

    expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);
  });

  it('removeSlides', () => {
    editor = removeSlides(addSlide(editor));

    expect(editor.presentation.slides.length).toEqual(1);
    expect(editor.selections.selectedSlideIDs.length).toEqual(1);
    expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);
  });

  it('setCurrentSlide', () => {
    editor = addSlide(editor);
    editor = setCurrentSlide(editor, editor.presentation.slides[0].id);

    expect(editor.selections.selectedSlideIDs.length).toEqual(1);
    expect(editor.selections.selectedSlideIDs[0]).toEqual(editor.presentation.slides[0].id);
  });
});
