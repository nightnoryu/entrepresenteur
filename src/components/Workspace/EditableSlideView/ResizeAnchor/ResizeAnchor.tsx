import React, { ForwardedRef, forwardRef } from 'react';
import { Position, SlideElement } from '../../../../model/types';
import styles from './ResizeAnchor.module.css';
import { RESIZE_ANCHOR_HEIGHT, RESIZE_ANCHOR_WIDTH, SELECTED_OVERLAY_STROKE } from '../../../../model/constants';

type ResizeAnchorProps = {
  element: SlideElement,
  delta: Position,
}

const ResizeAnchor = forwardRef(
  ({ element, delta }: ResizeAnchorProps, ref: ForwardedRef<SVGRectElement>) => (
    <rect
      x={element.position.x + element.dimensions.width - RESIZE_ANCHOR_WIDTH / 2}
      y={element.position.y + element.dimensions.height - RESIZE_ANCHOR_HEIGHT / 2}
      width={RESIZE_ANCHOR_WIDTH}
      height={RESIZE_ANCHOR_HEIGHT}
      fill={SELECTED_OVERLAY_STROKE}
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
