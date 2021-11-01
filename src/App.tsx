import React from 'react';
import Ribbon from './components/ribbon/Ribbon';
import SlidePanel from './components/slidepanel/SlidePanel';
import Workspace from './components/workspace/Workspace';
import './App.css';
import { Editor } from './model/types';

type AppProps = {
  editor: Editor;
}

function App(props: AppProps): JSX.Element {
  return (
    <div className="app">
      <Ribbon />
      <div className="app-main">
        <SlidePanel />
        <Workspace />
      </div>
    </div>
  );
}

export default App;
