import React from 'react';
import { TextElement } from '../../../../../model/types';
import styles from '../ElementView.module.css';

type TextElementViewProps = {
  element: TextElement;
}

function TextElementView({ element }: TextElementViewProps): JSX.Element {
  return (
    <text
      className={styles.element}
      x={element.position.x}
      y={element.position.y}
      dominantBaseline="hanging"
      textAnchor="left"
      style={{
        color: element.color,
        fontFamily: element.font,
        fontSize: element.size,
        width: element.dimensions.width,
        height: element.dimensions.height,
      }}
    >
      {element.value}
    </text>
  );
}

export default TextElementView;
