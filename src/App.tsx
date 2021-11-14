import React from 'react';
import Ribbon from './components/ribbon/Ribbon';
import SlidePanel from './components/slidepanel/SlidePanel';
import Workspace from './components/workspace/Workspace';
import './App.css';
import useConfirmLeaving from './hooks/useConfirmLeaving';
import { Editor } from './model/types';
import { isCurrentSlide } from './model/infrastructure_actions';

type AppProps = {
  editor: Editor;
}

function App({ editor }: AppProps): JSX.Element {
  const currentSlide = editor.presentation.slides.find(slide => isCurrentSlide(slide, editor.selectedSlideIDs));

  useConfirmLeaving();

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
