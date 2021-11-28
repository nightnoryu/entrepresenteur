import React from 'react';
import Ribbon from './components/ribbon/Ribbon';
import SlidePanel from './components/slidepanel/SlidePanel';
import Workspace from './components/workspace/Workspace';
import './App.css';
import useConfirmLeaving from './hooks/useConfirmLeaving';
import { isCurrentSlide } from './model/model_utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';
import useHotkey from './hooks/useHotkey';
import { openPresentationJSON, savePresentationJSON } from './common/fileUtils';

function App(): JSX.Element {
  const editor = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();
  const { openPresentation, newPresentation } = bindActionCreators(actionCreators, dispatch);

  const currentSlide = editor.presentation.slides.find(slide => isCurrentSlide(slide, editor.selectedSlideIDs));

  useConfirmLeaving();
  useHotkey('s', () => {
    savePresentationJSON(editor.presentation, editor.presentation.title);
  });
  useHotkey('o', () => {
    openPresentationJSON(presentation => {
      openPresentation(presentation);
    });
  });
  useHotkey('m', () => {
    const confirmed = confirm('Are you sure?');
    if (confirmed) {
      newPresentation();
    }
  });

  return (
    <div className="app">
      <Ribbon presentationTitle={editor.presentation.title} />

      <div className="app-main">
        <SlidePanel
          slides={editor.presentation.slides}
          selectedSlideIDs={editor.selectedSlideIDs}
        />

        <Workspace
          slide={currentSlide}
          selectedElementIDs={editor.selectedElementIDs}
        />
      </div>
    </div>
  );
}

export default App;
