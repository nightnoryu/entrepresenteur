import React, {JSXElementConstructor} from 'react';
import './SlideBlock.css';

type SlideBlockProps = {
    slidenumber: Number;
}

function SlideBlock({ slidenumber }: SlideBlockProps): JSX.Element {
    return (
        <div className='slideblock'>
            <p>{slidenumber}</p>
        </div>
    )
}
export default SlideBlock;