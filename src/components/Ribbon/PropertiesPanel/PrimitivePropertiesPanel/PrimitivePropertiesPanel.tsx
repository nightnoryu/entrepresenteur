import React from 'react';
import styles from './PrimitivePropertiesPanel.module.css';

function PrimitivePropertiesPanel(): JSX.Element {
  return (
    <ul className={styles.primitivePropertiesPanel}>
      <li className={styles.panelElement}>
        Fill
      </li>

      <li className={styles.panelElement}>
        Stroke
      </li>
    </ul>
  );
}

export default PrimitivePropertiesPanel;
