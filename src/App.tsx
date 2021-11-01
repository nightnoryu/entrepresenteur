import React from 'react';
import Ribbon from './components/ribbon/Ribbon';
import SlidePanel from './components/slidepanel/SlidePanel';
import Workspace from './components/workspace/Workspace';
import './App.css';
import { Editor } from './model/types';

type AppProps = {
  editor: Editor;
}

function App({ editor }: AppProps): JSX.Element {
  const currentSlide = editor.presentation.slides.find(slide => editor.selectedSlideIDs.includes(slide.id));

  return (
    <div className="app">
      <Ribbon title={editor.presentation.title} />
      <div className="app-main">
        <SlidePanel slides={editor.presentation.slides} selectedSlideIDs={editor.selectedSlideIDs} />
        <Workspace slide={currentSlide} selectedElementIDs={editor.selectedElementIDs} />
      </div>
    </div>
  );
}

export default App;
