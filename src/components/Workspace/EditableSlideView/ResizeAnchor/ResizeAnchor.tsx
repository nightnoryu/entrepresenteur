import React, { ForwardedRef, forwardRef } from 'react';
import { Position, SlideElement } from '../../../../model/types';
import { getResizeAnchorProperties } from '../../../../common/componentsUtils';
import styles from './ResizeAnchor.module.css';

type ResizeAnchorProps = {
  element: SlideElement,
  delta: Position,
}

const ResizeAnchor = forwardRef(
  ({ element, delta }: ResizeAnchorProps, ref: ForwardedRef<SVGRectElement>) => (
    <rect
      {...getResizeAnchorProperties(element)}
      className={styles.resizeAnchor}
      style={{
        transform: `translate(${delta.x}px, ${delta.y}px)`,
      }}
      ref={ref}
    />
  ),
);
ResizeAnchor.displayName = 'ResizeAnchor';

export default ResizeAnchor;
