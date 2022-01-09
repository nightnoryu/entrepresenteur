import React from 'react';
import styles from './TextPropertiesPanel.module.css';
import { getTextProperties } from '../../../../model/uiParameters/textProperties';
import { connect, useDispatch } from 'react-redux';
import { actionCreators } from '../../../../state';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../../state/reducers';
import { isCurrentElement, isCurrentSlide, mapFontToString, tryMapStringToFont } from '../../../../model/modelUtils';
import { ElementType, TextElement } from '../../../../model/types';
import { pickColor } from '../../../../common/fileUtils';

type TextPropertiesPanelProps = {
  currentElement?: TextElement;
};

function TextPropertiesPanel({ currentElement }: TextPropertiesPanelProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    toggleBoldText,
    toggleItalicText,
    setTextFont,
    setTextSize,
    setTextColor,
  } = bindActionCreators(actionCreators, dispatch);

  const textProps = getTextProperties();

  const onFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentElement) {
      setTextFont(currentElement.id, tryMapStringToFont(event.currentTarget.value));
    }
  };

  const onSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentElement) {
      const size = parseInt(event.currentTarget.value);
      setTextSize(currentElement.id, size);
    }
  };

  const onToggleBold = () => {
    if (currentElement) {
      toggleBoldText(currentElement.id);
    }
  };

  const onToggleItalic = () => {
    if (currentElement) {
      toggleItalicText(currentElement.id);
    }
  };

  const onColorPick = () => {
    if (currentElement) {
      pickColor()
        .then(color => setTextColor(currentElement.id, color))
        .catch(error => alert(error));
    }
  };

  return (
    <ul className={styles.textPropertiesPanel}>
      <li className={styles.panelElement}>
        <select
          name="font"
          className={styles.fontSelection}
          value={currentElement?.font ? mapFontToString(currentElement.font) : undefined}
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
        <button onClick={onToggleBold}>Bold</button>
      </li>

      <li className={styles.panelElement}>
        <button onClick={onToggleItalic}>Italic</button>
      </li>

      <li className={styles.panelElement}>
        Color
        <input
          type="color"
          defaultValue={currentElement?.color}
          onClick={onColorPick}
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
