import { Editor } from '../model/types';
import { createEditor, createNewPresentation } from '../model/infrastructure_actions';

type HandlerFunc = (() => void) | null;
type ModifyFunc = (editor: Editor) => Editor;

let editor = createEditor(createNewPresentation());
let editorChangeHandler: HandlerFunc = null;

function getEditor(): Editor {
  return editor;
}

function setEditor(newEditor: Editor): void {
  editor = newEditor;
}

function addEditorChangeHandler(handler: HandlerFunc): void {
  editorChangeHandler = handler;
}

function dispatch(modifyFn: ModifyFunc): void {
  const newEditor = modifyFn(editor);
  setEditor(newEditor);

  if (editorChangeHandler !== null) {
    editorChangeHandler();
  }
}

export {
  getEditor,
  addEditorChangeHandler,
  dispatch,
};
