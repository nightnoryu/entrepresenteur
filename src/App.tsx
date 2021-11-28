import React from 'react';
import Ribbon from './components/ribbon/Ribbon';
import SlidePanel from './components/slidepanel/SlidePanel';
import Workspace from './components/workspace/Workspace';
import './App.css';
import useConfirmLeaving from './hooks/useConfirmLeaving';
import { isCurrentSlide } from './model/model_utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/reducers';
import useEventListener from './hooks/useEventListener';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';

function App(): JSX.Element {
  const editor = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();
  const { openPresentation, newPresentation } = bindActionCreators(actionCreators, dispatch);

  const currentSlide = editor.presentation.slides.find(slide => isCurrentSlide(slide, editor.selectedSlideIDs));

  useConfirmLeaving();
  useEventListener('keydown', (e: Event) => {
    const event = e as KeyboardEvent;
    if (event.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();

      if (event.key === 's') {
        const file = new Blob([JSON.stringify(editor.presentation)], { type: 'text/plain' });
        const a = document.createElement('a');
        const url = URL.createObjectURL(file);

        a.href = url;
        a.download = `${editor.presentation.title}.entrepresenteur.json`;
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 0);

      } else if (event.key === 'o') {
        const input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {
          const target = e.target as HTMLInputElement;
          if (target?.files) {
            const file = target.files[0];

            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            reader.onload = readerEvent => {
              if (readerEvent.target?.result) {
                const content = readerEvent.target.result.toString() || '';
                openPresentation(JSON.parse(content));
              }
            };
          }
        };

        input.click();
      } else if (event.key === 'm') {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
          newPresentation();
        }
      }
    }
  });

  return (
    <div className="app">
      <Ribbon presentationTitle={editor.presentation.title} />
      <div className="app-main">
        <SlidePanel slides={editor.presentation.slides} selectedSlideIDs={editor.selectedSlideIDs} />
        <Workspace slide={currentSlide} selectedElementIDs={editor.selectedElementIDs} />
      </div>
    </div>
  );
}

export default App;
