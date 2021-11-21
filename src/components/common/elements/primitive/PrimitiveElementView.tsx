import React from 'react';
import { PrimitiveElement } from '../../../../model/types';
import styles from '../ElementView.module.css';
import { selectPrimitive } from '../../../../common/componentsFunctions';

type PrimitiveElementViewProps = {
  element: PrimitiveElement;
}

function PrimitiveElementView({ element }: PrimitiveElementViewProps): JSX.Element {
  return (
    <div
      className={styles.element}
      style={{
        width: element.dimensions.width,
        height: element.dimensions.height,
        left: element.position.x,
        top: element.position.y,
      }}
    >
      {selectPrimitive(element)}
    </div>
  );
}

export default PrimitiveElementView;
