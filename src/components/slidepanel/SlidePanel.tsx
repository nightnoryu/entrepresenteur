import React from 'react';
import './SlidePanel.css';

function SlidePanel(): JSX.Element {
    return (
        <div className="b-slidepanel">
            SlidePanel
            <div className="b-slidepanel__slide">
                Slide block
                <div className='b-slidepanel__slide-thumbnail'>
                    thumbnail
                </div>
            </div>
        </div>);
}

export default SlidePanel;
