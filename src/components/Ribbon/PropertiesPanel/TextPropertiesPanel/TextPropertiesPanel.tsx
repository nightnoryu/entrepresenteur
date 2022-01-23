import React, { useRef } from 'react';
import styles from './TextPropertiesPanel.module.css';
import { getTextProperties } from '../../../../model/uiParameters/textProperties';
import { connect, useDispatch } from 'react-redux';
import { actionCreators } from '../../../../state';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../../state/reducers';
import { isCurrentElement, isCurrentSlide, mapFontToString, tryMapStringToFont } from '../../../../model/modelUtils';
import { ElementType, TextElement } from '../../../../model/types';
import useColorPicker from '../../../../hooks/propsPanels/useColorPicker';

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

  const colorPickerRef = useRef<HTMLInputElement>(null);
  useColorPicker(colorPickerRef, color => {
    if (currentElement) {
      setTextColor(currentElement.id, color);
    }
  });

  return (
    <ul className={styles.textPropertiesPanel}>
      <li className={styles.panelElement}>
        Font
        <select
          name="font"
          className={styles.selection}
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
        Size
        <select
          name="size"
          className={styles.selection}
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
        <button onClick={onToggleBold} className={styles.styleButton}>Bold</button>
      </li>

      <li className={styles.panelElement}>
        <button onClick={onToggleItalic} className={styles.styleButton}>Italic</button>
      </li>

      <li className={styles.panelElement}>
        Color
        <span
          className={styles.colorPickerWrapper}
          onClick={() => colorPickerRef.current?.click()}
          style={{
            backgroundColor: currentElement?.color,
          }}
        >
          <input
            type="color"
            className={styles.colorPicker}
            defaultValue={currentElement?.color}
            ref={colorPickerRef}
          />
        </span>
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
