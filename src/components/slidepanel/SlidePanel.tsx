import React from 'react';
import './SlidePanel.css';

function SlidePanel(): JSX.Element {
    return (
        <div className="slidepanel">
            SlidePanel
            <div className="slidepanel__slide">
                Slide block
                <div className='slidepanel__slide-thumbnail'>
                    thumbnail
                </div>
            </div>
        </div>);
}

export default SlidePanel;
