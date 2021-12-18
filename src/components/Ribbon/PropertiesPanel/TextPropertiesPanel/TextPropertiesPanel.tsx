import React from 'react';
import styles from './TextPropertiesPanel.module.css';
import { getTextProperties } from '../../../../model/uiParameters/textProperties';

function TextPropertiesPanel(): JSX.Element {
  const textProps = getTextProperties();

  return (
    <ul className={styles.textPropertiesPanel}>
      <li className={styles.panelElement}>
        <select name="font">
          {textProps.fonts.map(fontOption => (
            <option key={fontOption} value={fontOption}>{fontOption}</option>
          ))}
        </select>
      </li>
      <li className={styles.panelElement}>Color</li>
    </ul>
  );
}

export default TextPropertiesPanel;
