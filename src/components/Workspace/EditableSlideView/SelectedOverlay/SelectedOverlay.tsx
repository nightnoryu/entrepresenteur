import React from 'react';
import { Dimensions, Position, SlideElement } from '../../../../model/types';
import styles from './SelectedOverlay.module.css';
import { SELECTED_OVERLAY_FILL, SELECTED_OVERLAY_OPACITY, SELECTED_OVERLAY_STROKE } from '../../../../model/constants';

type SelectedOverlayProps = {
  element: SlideElement,
  dimensions: Dimensions,
  delta: Position,
}

function SelectedOverlay({ element, dimensions, delta }: SelectedOverlayProps): JSX.Element {
  return (
    <rect
      x={element.position.x}
      y={element.position.y}
      width={dimensions.width}
      height={dimensions.height}
      fill={SELECTED_OVERLAY_FILL}
      stroke={SELECTED_OVERLAY_STROKE}
      fillOpacity={SELECTED_OVERLAY_OPACITY}
      strokeOpacity={SELECTED_OVERLAY_OPACITY}
      className={styles.selectedOverlay}
      style={{
        transform: `translate(${delta.x}px, ${delta.y}px)`,
      }}
    />
  );
}

export default SelectedOverlay;
