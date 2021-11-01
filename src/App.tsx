import React from 'react';
import Ribbon from './components/ribbon/Ribbon';
import SlidePanel from './components/slidepanel/SlidePanel';
import Workspace from './components/workspace/Workspace';

function App(): JSX.Element {
    return (
        <div className="app">
            <Ribbon/>
            <div className='b-slide'>
                <SlidePanel/>
                <Workspace/>
            </div>
        </div>
    );
}

export default App;
