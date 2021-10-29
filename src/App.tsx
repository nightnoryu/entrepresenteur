import React from 'react';
import Ribbon from './components/ribbon/Ribbon';
import SlidePanel from './components/slidepanel/SlidePanel';
import Workspace from './components/workspace/Workspace';

function App(): JSX.Element {
  return (
    <div className="app">
      <Ribbon />
      <SlidePanel />
      <Workspace />
    </div>
  );
}

export default App;
