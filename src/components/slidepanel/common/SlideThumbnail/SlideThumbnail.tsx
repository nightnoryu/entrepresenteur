import React, {JSXElementConstructor} from 'react';
import 'SlideThumbnail.css';
import  '../../../common/slideview/SlideView'
import {Slide} from "../../../../model/types";

type SlideThumbnailProps = {
    slide: Slide;
}

function SlideThumbnail({ slide }: SlideThumbnailProps): JSX.Element {
    return (
        <div className='slidethumbnail'>

        </div>
    )
};

export default SlideThumbnail


