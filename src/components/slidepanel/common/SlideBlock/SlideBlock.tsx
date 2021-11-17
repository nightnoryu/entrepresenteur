import React, {JSXElementConstructor} from 'react';
import './SlideBlock.css';
// import {ReactComponent as SlideSVG} from '../images/dots_orange.svg';


type SlideBlockProps = {
    slidenumber: number;
}

function SlideBlock({ slidenumber }: SlideBlockProps): JSX.Element {
    return (
        <div>
            {/*<div className='slideicon'>*/}
            {/*    <SlideSVG />*/}
            {/*</div>*/}
        </div>
    );
}
export default SlideBlock;