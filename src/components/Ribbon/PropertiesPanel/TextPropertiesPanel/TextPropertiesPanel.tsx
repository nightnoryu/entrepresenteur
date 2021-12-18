import React from 'react';
import styles from './TextPropertiesPanel.module.css';
import { getTextProperties } from '../../../../model/uiParameters/textProperties';
import { connect, useDispatch } from 'react-redux';
import { actionCreators } from '../../../../state';
import { bindActionCreators } from 'redux';
import { UUID } from '../../../../model/uuid';
import { RootState } from '../../../../state/reducers';

type TextPropertiesPanelProps = {
  currentElementID: UUID;
};

function TextPropertiesPanel({ currentElementID }: TextPropertiesPanelProps): JSX.Element {
  const dispatch = useDispatch();
  const { setTextFont, setTextSize } = bindActionCreators(actionCreators, dispatch);

  const textProps = getTextProperties();

  const onFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTextFont(currentElementID, event.currentTarget.value);
  };

  const onSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(event.currentTarget.value);
    setTextSize(currentElementID, size);
  };

  return (
    <ul className={styles.textPropertiesPanel}>
      <li className={styles.panelElement}>
        <select
          name="font"
          className={styles.fontSelection}
          onChange={onFontChange}
        >
          {textProps.fonts.map(fontOption => (
            <option
              key={fontOption}
              value={fontOption}
            >
              {fontOption}
            </option>
          ))}
        </select>
      </li>

      <li className={styles.panelElement}>
        <select
          name="size"
          className={styles.sizeSelection}
          onChange={onSizeChange}
        >
          {textProps.sizes.map(sizeValue => (
            <option
              key={sizeValue}
              value={sizeValue}
            >
              {sizeValue}
            </option>
          ))}
        </select>
      </li>
    </ul>
  );
}

function mapStateToProps(state: RootState): TextPropertiesPanelProps {
  return {
    currentElementID: state.selectedElementIDs[0],
  };
}

export default connect(mapStateToProps)(TextPropertiesPanel);
