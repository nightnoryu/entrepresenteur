import { BackgroundType, Editor, ElementType, PrimitiveType } from '../model/types';

type HandlerFunc = (() => void) | null;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type ModifyFunc = (editor: Editor, payload?) => Editor;

let editor: Editor = {
  presentation: {
    title: 'Sample presentation',
    slides: [
      {
        id: 'slide1',
        background: {
          type: BackgroundType.SOLID,
          color: '#efffff',
        },
        elements: [
          {
            id: 'element1',
            type: ElementType.TEXT,
            position: {
              x: 200,
              y: 300,
            },
            dimensions: {
              width: 100,
              height: 100,
            },
            value: 'Sample',
            color: '#000000',
            font: 'Calibri',
            size: 14,
          },
          {
            id: 'element2',
            type: ElementType.IMAGE,
            position: {
              x: 400,
              y: 100,
            },
            dimensions: {
              width: 100,
              height: 100,
            },
            src: 'https://sun9-52.userapi.com/impg/hfp3GegAiTarASchXrdeEHs2mZxuWzSRlZYKwQ/KGBV_Z07zM8.jpg?size=737x647&quality=95&sign=6fed5591ff3f39e8304ea05d3e4cf8d4&type=album',
          },
          {
            id: 'element3',
            type: ElementType.PRIMITIVE,
            position: {
              x: 500,
              y: 400,
            },
            dimensions: {
              width: 100,
              height: 100,
            },
            primitiveType: PrimitiveType.RECTANGLE,
            fill: '#ff0000',
            stroke: '#000000',
          },
          {
            id: 'element4',
            type: ElementType.PRIMITIVE,
            position: {
              x: 100,
              y: 100,
            },
            dimensions: {
              width: 100,
              height: 100,
            },
            primitiveType: PrimitiveType.TRIANGLE,
            fill: '#ff0000',
            stroke: '#000000',
          },
          {
            id: 'element5',
            type: ElementType.PRIMITIVE,
            position: {
              x: 100,
              y: 400,
            },
            dimensions: {
              width: 100,
              height: 100,
            },
            primitiveType: PrimitiveType.ELLIPSE,
            fill: '#ff0000',
            stroke: '#000000',
          },
        ],
      },
      {
        id: 'slide2',
        background: {
          type: BackgroundType.IMAGE,
          src: 'https://www.windowscentral.com/sites/wpcentral.com/files/styles/large/public/field/image/2017/04/windows-xp-bliss.jpg',
        },
        elements: [
          {
            id: 'element21',
            type: ElementType.TEXT,
            position: {
              x: 300,
              y: 300,
            },
            dimensions: {
              width: 200,
              height: 50,
            },
            value: 'Font props test',
            color: '#ff0000',
            font: 'Consolas',
            size: 16,
          },
        ],
      },
    ],
  },
  selectedElementIDs: [],
  selectedSlideIDs: [
    'slide1',
  ],
  history: {
    undoStack: [],
    currentState: -1,
  },
};
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function dispatch(modifyFn: ModifyFunc, payload?): void {
  const newEditor = modifyFn(editor, payload);
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
