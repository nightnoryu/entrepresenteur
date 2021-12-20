import React from 'react';
import styles from './TextPropertiesPanel.module.css';
import { getTextProperties } from '../../../../model/uiParameters/textProperties';
import { connect, useDispatch } from 'react-redux';
import { actionCreators } from '../../../../state';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../../state/reducers';
import { isCurrentElement, isCurrentSlide } from '../../../../model/modelUtils';
import { ElementType, TextElement } from '../../../../model/types';

type TextPropertiesPanelProps = {
  currentElement?: TextElement;
};

function TextPropertiesPanel({ currentElement }: TextPropertiesPanelProps): JSX.Element {
  const dispatch = useDispatch();
  const { setTextFont, setTextSize, setTextColor } = bindActionCreators(actionCreators, dispatch);

  const textProps = getTextProperties();

  const onFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentElement) {
      setTextFont(currentElement.id, event.currentTarget.value);
    }
  };

  const onSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentElement) {
      const size = parseInt(event.currentTarget.value);
      setTextSize(currentElement.id, size);
    }
  };

  const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentElement) {
      setTextColor(currentElement.id, event.currentTarget.value);
    }
  };

  return (
    <ul className={styles.textPropertiesPanel}>
      <li className={styles.panelElement}>
        <select
          name="font"
          className={styles.fontSelection}
          value={currentElement?.font}
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
          value={currentElement?.size}
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

      <li className={styles.panelElement}>
        Color
        <input
          type="color"
          defaultValue={currentElement?.color}
          onInput={onColorChange}
        />
      </li>
    </ul>
  );
}

function mapStateToProps(state: RootState): TextPropertiesPanelProps {
  for (const slide of state.presentation.slides) {
    if (isCurrentSlide(slide, state.selections.selectedSlideIDs)) {
      for (const element of slide.elements) {
        if (isCurrentElement(element, state.selections.selectedElementIDs) && element.type === ElementType.TEXT) {
          return {
            currentElement: element,
          };
        }
      }
    }
  }

  return {
    currentElement: undefined,
  };
}

export default connect(mapStateToProps)(TextPropertiesPanel);
